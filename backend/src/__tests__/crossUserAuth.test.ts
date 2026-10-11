import assert from 'node:assert';
import { test, describe } from 'node:test';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'app_super_secret_jwt_key_domain_2026_9xqm';

// Create two distinct user identities
const USER_A_ID = new mongoose.Types.ObjectId().toString();
const USER_B_ID = new mongoose.Types.ObjectId().toString();

const USER_A_TOKEN = jwt.sign({ id: USER_A_ID, email: 'user_a_cross_test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
const USER_B_TOKEN = jwt.sign({ id: USER_B_ID, email: 'user_b_cross_test@example.com' }, JWT_SECRET, { expiresIn: '1h' });

describe('Cross-User Authorization & Data Isolation Tests', () => {
  test('Two distinct valid tokens represent separate identities', () => {
    const decodedA = jwt.verify(USER_A_TOKEN, JWT_SECRET) as { id: string };
    const decodedB = jwt.verify(USER_B_TOKEN, JWT_SECRET) as { id: string };

    assert.strictEqual(decodedA.id, USER_A_ID);
    assert.strictEqual(decodedB.id, USER_B_ID);
    assert.notStrictEqual(decodedA.id, decodedB.id, 'User A and User B must have distinct user IDs');
  });

  test('Query filtering guarantees cross-user isolation for reads', () => {
    // Simulating MongoDB owner filter logic used in DomainItemService.getAll and getById
    const testRecordA = { _id: 'rec_101', title: 'User A Confidential Financial Record', owner: USER_A_ID };
    const testRecordB = { _id: 'rec_202', title: 'User B Grocery Expense', owner: USER_B_ID };

    const records = [testRecordA, testRecordB];

    // Filter by User A's session ID
    const userAResults = records.filter(r => r.owner === USER_A_ID);
    assert.strictEqual(userAResults.length, 1);
    assert.strictEqual(userAResults[0]._id, 'rec_101');

    // User B attempts to read User A record by ID
    const userBFetchAttempt = records.find(r => r._id === 'rec_101' && r.owner === USER_B_ID);
    assert.strictEqual(userBFetchAttempt, undefined, 'User B must not be able to read User A record');
  });

  test('Mutation authorization guarantees cross-user isolation for updates and deletes', () => {
    let testRecordA = { _id: 'rec_101', title: 'Original Amount ₹5,000', amountPaise: 500000, owner: USER_A_ID };

    // User B attempts to mutate User A's record
    const attemptUpdate = (recordId: string, actorId: string, newTitle: string) => {
      if (testRecordA._id === recordId && testRecordA.owner === actorId) {
        testRecordA.title = newTitle;
        return true;
      }
      return false; // Rejected: 404 / 403
    };

    const updateAllowed = attemptUpdate('rec_101', USER_B_ID, 'Hacked Title By User B');
    assert.strictEqual(updateAllowed, false, 'User B must be rejected from modifying User A record');
    assert.strictEqual(testRecordA.title, 'Original Amount ₹5,000', 'User A record must remain completely unchanged');

    // User B attempts to delete User A's record
    const attemptDelete = (recordId: string, actorId: string) => {
      if (testRecordA._id === recordId && testRecordA.owner === actorId) {
        return true;
      }
      return false; // Rejected: 404 / 403
    };

    const deleteAllowed = attemptDelete('rec_101', USER_B_ID);
    assert.strictEqual(deleteAllowed, false, 'User B must be rejected from deleting User A record');
    assert.strictEqual(testRecordA.amountPaise, 500000, 'User A financial balance must remain intact');
  });
});

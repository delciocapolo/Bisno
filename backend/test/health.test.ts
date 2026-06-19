import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('backend', () => {
  it('should have correct project name', () => {
    assert.strictEqual('backend', 'backend');
  });
});

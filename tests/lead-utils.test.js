const test = require('node:test');
const assert = require('node:assert/strict');

const LeadUtils = require('../assets/js/lead-utils.js');

test('formats an 010 mobile number with hyphens', () => {
  assert.equal(LeadUtils.formatPhoneInputValue('01012345678'), '010-1234-5678');
});

test('formats a 011 mobile number without forcing 010', () => {
  assert.equal(LeadUtils.formatPhoneInputValue('0111234567'), '011-123-4567');
});

test('validates supported Korean mobile prefixes', () => {
  assert.equal(LeadUtils.isValidPhone('016-123-4567'), true);
  assert.equal(LeadUtils.isValidPhone('0191234567'), true);
  assert.equal(LeadUtils.isValidPhone('0212345678'), false);
});

test('rejects obviously fake mobile patterns', () => {
  assert.equal(LeadUtils.isObviouslyFakeKoreanMobile('010-0000-0000'), true);
  assert.equal(LeadUtils.isObviouslyFakeKoreanMobile('010-1234-5678'), true);
  assert.equal(LeadUtils.isObviouslyFakeKoreanMobile('010-9876-5432'), false);
});

test('validates plausible lead names', () => {
  assert.equal(LeadUtils.isLikelyValidLeadName('홍길동'), true);
  assert.equal(LeadUtils.isLikelyValidLeadName('김민수'), true);
  assert.equal(LeadUtils.isLikelyValidLeadName('test'), false);
  assert.equal(LeadUtils.isLikelyValidLeadName('가1'), false);
});

test('creates masked completion data', () => {
  assert.deepEqual(
    LeadUtils.createSafeCompleteData({
      name: '김민수',
      phone: '01012345678',
      type: '아파트'
    }),
    {
      name: '김*수',
      phone: '010-****-5678',
      type: '아파트'
    }
  );
});

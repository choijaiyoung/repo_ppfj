'use strict';

const mongoose = require('mongoose');

/**
 * 세스코 관리 구획정보
 * MySQL table: managed_division
 * MongoDB collection: managed_division
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 관리구역타입 (1: 소규모/산업체, 2: 가정집)
    division_type: { type: Number, required: true, index: true },
    // 관리구역코드
    division_code: { type: String, required: true },
    // 관리구역명
    division_name: { type: String, required: true },
    // 비고
    remark: { type: String, default: '' },
    // 사용유무
    is_use: { type: Boolean, required: true },
    // 작성자
    insert_id: { type: Number },
    // 작성일
    insert_date: { type: Date, required: true },
    // 수정자
    update_id: { type: Number, required: true },
    // 수정일
    update_date: { type: Date, required: true },
  },
  { collection: 'managed_division', versionKey: false }
);

module.exports = mongoose.models.ManagedDivision || mongoose.model('ManagedDivision', schema);

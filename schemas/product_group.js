'use strict';

const mongoose = require('mongoose');

/**
 * 제품 그룹
 * MySQL table: product_group
 * MongoDB collection: product_group
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 그룹유형(P0001 1:펌웨어, 2:원격제어)
    group_type: { type: Number, required: true },
    // 그룹명
    group_name: { type: String, required: true, index: true },
    // 모델아이디(펌웨어시 제품코드별)
    model_id: { type: Number, index: true },
    // 비고
    remark: { type: String, default: '' },
    // 사용유무
    is_use: { type: Boolean, required: true },
    // 등록자
    insert_id: { type: Number, required: true },
    // 등록일자
    insert_date: { type: Date, required: true },
    // 수정자
    update_id: { type: Number, required: true },
    // 수정일
    update_date: { type: Date, required: true },
  },
  { collection: 'product_group', versionKey: false }
);

module.exports = mongoose.models.ProductGroup || mongoose.model('ProductGroup', schema);

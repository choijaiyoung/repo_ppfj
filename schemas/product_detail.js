'use strict';

const mongoose = require('mongoose');

/**
 * 장비 상세 상태 정보
 * MySQL table: product_detail
 * MongoDB collection: product_detail
 */
const schema = new mongoose.Schema(
  {
    // 제품아이디 (product.id)
    product_id: { type: Number, required: true, unique: true },
    // 현재 활성 알람 발생 존재여부 1:발생, 0:해제
    is_active_alarm: { type: Boolean, required: true, index: true },
    // 등록일자
    insert_date: { type: Date, required: true },
    // 수정일자
    update_date: { type: Date, required: true },
  },
  { collection: 'product_detail', versionKey: false }
);

module.exports = mongoose.models.ProductDetail || mongoose.model('ProductDetail', schema);

'use strict';

const mongoose = require('mongoose');

/**
 * 운영 상태 관리 로그
 * MySQL table: product_operation_status_log
 * MongoDB collection: product_operation_status_log
 */
const schema = new mongoose.Schema(
  {
    // 로그 기록의 고유 식별자
    id: { type: Number, required: true, unique: true },
    // 상태가 변경된 product 테이블의 ID
    product_id: { type: Number, required: true, index: true },
    // 변경 전 operation_status 값
    old_status: { type: Number },
    // 변경 후 operation_status 값
    new_status: { type: Number },
    // 상태 변경 사유 또는 설명
    change_reason: { type: String, required: true },
    // 비고
    remark: { type: String, default: '' },
    // 사용유무
    is_use: { type: Boolean, required: true },
    // 로그를 기록한 사용자 ID
    insert_id: { type: Number, required: true },
    // 로그 기록 시점
    insert_date: { type: Date, required: true },
    // 로그 수정자 ID
    update_id: { type: Number, required: true },
    // 로그 수정 시점
    update_date: { type: Date, required: true },
  },
  { collection: 'product_operation_status_log', versionKey: false }
);

module.exports = mongoose.models.ProductOperationStatusLog || mongoose.model('ProductOperationStatusLog', schema);

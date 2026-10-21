'use strict';

const mongoose = require('mongoose');

/**
 * 제품 카테고리 관리 테이블
 * MySQL table: model_category
 * MongoDB collection: model_category
 */
const schema = new mongoose.Schema(
  {
    // 카테고리 ID
    id: { type: Number, required: true, unique: true },
    // 카테고리 코드
    code: { type: String, required: true, unique: true },
    // 카테고리 이름
    name: { type: String, required: true, index: true },
    // 카테고리 레벨 (1, 2, 3 등)
    level: { type: Number, required: true },
    // 상위 카테고리 ID
    parent_category_id: { type: Number, index: true },
    // 모델 구분타입(M0002 1:허브, 2:라우터, 3:공기청정기)
    type: { type: Number },
    // 비고
    remark: { type: String, default: '' },
    // 사용유무 (1:사용, 0:미사용)
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
  { collection: 'model_category', versionKey: false }
);

module.exports = mongoose.models.ModelCategory || mongoose.model('ModelCategory', schema);

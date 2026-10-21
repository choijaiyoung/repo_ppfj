'use strict';

const mongoose = require('mongoose');

/**
 * 장비 유형정보
 * MySQL table: model_type
 * MongoDB collection: model_type
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 유형코드
    type_code: { type: String, required: true, unique: true },
    // 유형명_한글
    type_name_ko: { type: String, required: true },
    // 유형명_영문
    type_name_en: { type: String },
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
  { collection: 'model_type', versionKey: false }
);

module.exports = mongoose.models.ModelType || mongoose.model('ModelType', schema);

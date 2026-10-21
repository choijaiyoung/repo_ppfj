'use strict';

const mongoose = require('mongoose');

/**
 * 장비 세부모델 정보
 * MySQL table: model_sub
 * MongoDB collection: model_sub
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 세부모델코드
    model_sub_code: { type: String, required: true, unique: true },
    // 세부모델명_한글
    model_sub_name_ko: { type: String, required: true },
    // 세부모델명_영문
    model_sub_name_en: { type: String },
    // 장비 품목정보의 아이디 (model.id)
    model_id: { type: Number, required: true, index: true },
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
  { collection: 'model_sub', versionKey: false }
);

module.exports = mongoose.models.ModelSub || mongoose.model('ModelSub', schema);

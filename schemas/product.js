'use strict';

const mongoose = require('mongoose');

/**
 * 실제 장치 정보
 * MySQL table: product
 * MongoDB collection: product
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 자산번호
    asset_number: { type: String, required: true, unique: true },
    // 장비 세부모델 정보의 아이디 (model_sub.id)
    model_sub_id: { type: Number, required: true, index: true },
    // 허브 장비 아이디 (product.id)
    hub_id: { type: Number, index: true },
    // 고객 아이디
    customer_id: { type: Number, index: true },
    // 프로비저닝상태
    prov_state: { type: Number, index: true },
    // 프로비저닝상태 수정일
    prov_updated_at: { type: Date },
    // 개발 환경 타입 (P0002 1:STG, 2:PRD)
    env_type: { type: Number },
    // 원격제어 포맷유형 (1:json, 2:bin)
    format_type: { type: Number },
    // 네트워크 통신모듈유형(M0001)
    net_type_id: { type: Number },
    // 현재 통신 방식(M0001)
    cur_net_type_id: { type: Number },
    // 운영 상태 (P0004 1:운영, 2:비운영, 3:운휴)
    operation_status: { type: Number },
    // 조회코드
    search_number: { type: String, index: true },
    // 장비코드
    eqip_code: { type: String },
    // 디바이스서비스유형(1.PG, 2.S-IPM, 3.AZURE-API, 4.AZURE-IOT)
    device_type: { type: Number },
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
  { collection: 'product', versionKey: false }
);

module.exports = mongoose.models.Product || mongoose.model('Product', schema);

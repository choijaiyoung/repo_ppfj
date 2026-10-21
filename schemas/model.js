'use strict';

const mongoose = require('mongoose');

/**
 * 장비 품목 정보
 * MySQL table: model
 * MongoDB collection: model
 */
const schema = new mongoose.Schema(
  {
    // 아이디
    id: { type: Number, required: true, unique: true },
    // 모델코드
    model_code: { type: String, required: true, unique: true },
    // legacy 품목코드(구 모델 코드)
    legacy_item_code: { type: String },
    // 모델명_한글
    model_name_ko: { type: String, required: true, index: true },
    // 모델관리
    model_management: { type: String },
    // 소분류코드
    sub_category_code: { type: String },
    // 소분류명_한글
    sub_category_name_ko: { type: String },
    // 자산번호품목코드
    asset_no_item_code: { type: String },
    // 장비유형정보 아이디 (model_type.id)
    model_type_id: { type: Number, index: true },
    // 장비유형 카테고리 아이디 (model_category.id)
    category_id: { type: Number, index: true },
    // 통신모듈(M0001 1:LTE-CAT.M1, 2:NB-IoT, 3:Wi-Fi, 4:Thread, 5:Wi-SUN, 6:Wi-Fi HaLow, 7:LTE-CAT.M1/Wi-Fi)
    net_type_id: { type: Number },
    // 최신펌웨어 등록여부
    is_latest_firmware_registered: { type: Boolean, required: true },
    // 주기데이터전송주기(분)
    transmission_interval_minutes: { type: Number },
    // End Point(M0004 1:AWS IoTCore, 2:Azure IoTHub, 3:Azure-TCP, 4:On-Premise)
    device_type: { type: Number },
    // 전원유형(M0005 1:배터리, 2:상시 전원)
    power_type: { type: Number },
    // 통신 Protocol(M0006 1:MQTT, 2:TCP)
    net_protocol: { type: Number },
    // Payload Format(P0003 1:JSON, 2:Binary)
    format_type: { type: Number },
    // Separator Category(M0007 1:0x1xxx ~ 6:0x6xxx)
    separator_category: { type: Number },
    // Data 전송주기(M0008 1:1 H, 2:하루1번, 3:하루3번, 4:10분)
    transmission_interval: { type: Number },
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
    // 테스트데이터여부(1이면 마이그레이션 시 상태변경 제외)
    is_test_data: { type: Boolean },
  },
  { collection: 'model', versionKey: false }
);

module.exports = mongoose.models.Model || mongoose.model('Model', schema);

# platform-api (AWS Lambda / Node.js / MongoDB)

## 구조
```
index.js                 Lambda 엔트리 (HTTP 요청 파싱, 응답)
commandHandler.js        API command handler (API명 -> 핸들러, Mongo 연결)
commands/getProductInfo.js
db.js                    MongoDB 연결 (컨테이너 재사용)
schemas/*.js             테이블별 Mongoose 스키마 (11개)
```

## 테이블 -> 컬렉션
locations, managed_division, model, model_category, model_sub, model_type,
product, product_detail, product_group, product_operation_status_log
(컬렉션명 = 엑셀의 Table Name, 컬럼명 동일, int/bigint -> Number, bit(1) -> Boolean, datetime -> Date)

## API
`POST /getProductInfo`
```json
{ "asset_number": "AB123456" }
```
- 200: 요청 명세의 22개 필드 (값이 없으면 null)
- 400: asset_number 누락 / 404: 제품 없음 / 405: POST 외 메서드

조인: product.model_sub_id -> model_sub.id -> model_sub.model_id -> model.id -> model.model_type_id -> model_type.id

## 배포
1. `npm install --omit=dev` 후 폴더 내용 전체를 zip
2. Lambda 생성: Runtime Node.js 20.x, Handler `index.handler`, Timeout 10s 이상
3. 환경변수: `MONGODB_URI`, `MONGODB_DB`
4. 보안 없는 HTTP 호출: Configuration > Function URL > Auth type **NONE**
   (또는 API Gateway HTTP API + Lambda 통합, Authorizer 없음)
5. Lambda가 MongoDB에 접근 가능해야 함 (Atlas IP 허용 / VPC 구성)

## 호출 예
```
curl -X POST https://<function-url>/getProductInfo \
  -H 'Content-Type: application/json' -d '{"asset_number":"AB123456"}'
```

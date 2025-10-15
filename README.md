## 할일 관리

### 스택

[REACT NATIVE]

### 시작 방법

1. `yarn start`
2. 또 다른 터미널 `yarn start ios`

### 화면

<div style="display: flex; justify-content: space-around">
  <image src="https://github-production-user-asset-6210df.s3.amazonaws.com/82592845/501362981-77b6935d-853b-438f-86a2-4e3a7951a1b8.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251015T080231Z&X-Amz-Expires=300&X-Amz-Signature=8246fba00fd9f8a2141495ba0c668c93fee5398854b762a0e1d5e7b0814573bf&X-Amz-SignedHeaders=host" style="width: 33%;" />
  <image src="https://github-production-user-asset-6210df.s3.amazonaws.com/82592845/501364803-77905d2d-3138-4562-abb0-fbb0d42c321f.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251015T080439Z&X-Amz-Expires=300&X-Amz-Signature=c9ae337c8b5391925041329727260e4153dd27ff71c78b8b2ee3763c6fde1205&X-Amz-SignedHeaders=host" style="width: 33%;" />
  <image src="https://github-production-user-asset-6210df.s3.amazonaws.com/82592845/501369395-16d80c6c-ebd9-4248-ba14-aeb9e93c1f80.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251015T081251Z&X-Amz-Expires=300&X-Amz-Signature=0bee8b28b71c14d6df5e479bb2cf6ff36a3929519e5ce752c53b36587f084078&X-Amz-SignedHeaders=host" style="width: 33%;" />
</div>

### 구현

1. 할일

- 기본적으로 오늘의 투두리스트가 처음으로 보여집니다.
- (+) 아이콘 클릭 시, 등록 가능한 모달이 노출됩니다.
- 할일을 입력하고 Add Task 클릭 시 스토리지에 저장됩니다.
- 할일을 스와이프 하면 삭제 버튼이 노출되며, 일정수준 이상 스와이프하게 되면 자동으로 삭제가 진행됩니다.

2. 바텀시트

- 전역에서 사용가능한 형태로 최상단 루트에 존재합니다.
- 이는 Recoil 상태를 이용하여, 보여지고, 원한다면 바텀시트안의 content도 지정하여 커스텀 가능합니다.
- 직접 슬라이드하여 영역을 올리거나 내릴수 있습니다.

3. SectionList

- SectionList를 활용하여, 각년도의 월별로 표시 가능하게 했습니다.
- 이 또한, 스와이프로 삭제가 가능하며, 이를 통해 투두 리스트에 들어간다면, 해당 일자의 TodoList가 노출됩니다.

# 프로젝트 소개

[<p align="center"><img src="https://user-images.githubusercontent.com/87280835/217243456-297db449-3200-49a2-b831-c3835aa5a86e.png"></p>](https://sju-catchup.github.io/frontend/)

### 이상행동 탐지 및 추적 시스템
CCTV 대수에 비해 현저히 부족한 관제인력을 보조하기 위해 개발되었습니다.


CCTV 영상 분석을 통해 이상행동을 감지하고 다른 CCTV에서 동일인물인지 판단하는 AI 파트와 소켓통신을 통해 실시간으로 AI 서비스를 지도 뷰로 제공하는 Web 파트로 구성되어 있습니다.

<https://sju-catchup.github.io/frontend/>

(static page만 제공되고 있습니다)

# 설계 모델
<p align="center"><img src="https://user-images.githubusercontent.com/68629004/192200627-dc9fd5d7-bfc7-47ea-aa5d-e15d11e6d454.jpg"></p>
 

# 시스템 아키텍처
<p align="center"><img src="https://user-images.githubusercontent.com/87280835/217241501-b89745fb-d7e1-41fb-9932-fa24b1b0dfce.png"></p>
 




# 기능 소개
### 이상행동 탐지
- CCTV 영상을 분석하여 인물의 행동을 폭행, 강도, 실신, Nothing으로 분류합니다. Nothing을 제외한 나머지 라벨에 해당하는 경우에 웹을 통해 알림이 나타납니다.
- 이상행동의 발생위치를 알 수 있는 지도와 이상행동에 대한 정보를 담고 있는 테이블로 구성되었습니다.
- 마커를 클릭하면 이상행동에 대한 CCTV 영상을 확인하고 추적대상을 선택할 수 있습니다.
<details>
<summary>마커 소개</summary>

<img src="https://user-images.githubusercontent.com/87280835/217247131-13457d9f-d87b-4309-83b0-ebb84a8b43b2.png" width="20" height="25"/> : 실시간으로 탐지된 이상행동의 발생 위치

<img src="https://user-images.githubusercontent.com/87280835/217247754-0d51e94b-15be-4a57-b3e9-803d2b43b600.png" width="20" height="25"/> : 이전에 탐지된 이상행동의 발생 위치


검은점 : 단순 CCTV의 위치 

 </details>



<p align="center"><img src="https://user-images.githubusercontent.com/87280835/217239464-ebccbeb4-4924-4234-bba9-4f21466dc934.gif"></p>


### 객체 추적
- 추적대상을 선택하면 해당 인물이 서비스 지역 내의 CCTV에 포착될 때마다 위치를 포함한 기타 정보가 프론트엔드로 전달됩니다. 
- 추적대상의 위치를 알 수 있는 지도와 추적대상에 대한 정보를 담고 있는 테이블로 구성되었습니다.

<p align="center"><img src="https://user-images.githubusercontent.com/87280835/217239507-30425317-0f25-4529-89aa-1155dcc28875.gif"></p>

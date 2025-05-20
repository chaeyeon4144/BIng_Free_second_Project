<template>
  <div class="agree_box max-w-[860px] mx-auto py-20 px-6 bg-white">
    <!-- 제목 -->
    <h2 class="text-3xl font-bold text-center text-neutral-800 mb-16">정보입력</h2>

    <!-- 단계 표시 -->
    <div class="flex justify-center">
      <div class="w-[695px] h-24 relative rounded-[100px]">
        <div
          class="left-[3px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          약관동의
        </div>
        <div
          class="left-[215px] top-[82px] absolute justify-start text-neutral-800 text-base font-semibold font-['Pretendard']">
          회원정보
        </div>
        <div
          class="left-[424px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          구독선택
        </div>
        <div
          class="left-[635px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          가입완료
        </div>
        <div
          class="w-36 h-0 left-[65px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[275px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[485px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div class="w-16 h-16 left-[210px] top-0 absolute bg-blue-700 rounded-[100px]"></div>
        <div
          class="left-[233px] top-[15px] absolute justify-start text-white text-3xl font-semibold font-['Pretendard']">
          2
        </div>
        <div class="w-16 h-16 left-[420px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[443px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          3
        </div>
        <div class="w-16 h-16 left-[630px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[653px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          4
        </div>
        <div class="w-16 h-16 left-0 top-0 absolute rounded-[100px] border border-blue-700"></div>
        <div
          class="left-[26px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          1
        </div>
      </div>
    </div>
    <!-- 로그인 폼 -->
    <div class="w-[860px] mt-[100px] mb-[120px] flex flex-col items-center justify-center px-4">
      <!-- 탭 -->
      <div class="w-[860px] mt-[100px] mb-[120px] flex flex-col items-start justify-center px-4">
        <!-- 탭 -->
        <div class="w-full max-w-[860px] flex h-14 mb-6">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            @click="changeTab(index)"
            :class="[
              'flex-1 flex items-center justify-center font-semibold cursor-pointer transition',
              activeTab === index ? 'active-tab' : 'inactive-tab',
            ]">
            {{ tab }}
          </div>
        </div>
        <!-- 회원 정보 입력  -->
        <div
          class="flex justify-start w-full mt-[42px] relative text-black text-xl font-bold font-['Pretendard']"
          style="padding-bottom: 42px">
          회원 정보 입력 (필수)
          <span
            class="absolute left-0 bottom-0 w-[860px] h-0 outline outline-1 outline-offset-[-0.5px] outline-neutral-400"
            style="content: ''; display: block"></span>
        </div>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="w-full max-w-[860px]">
        <div class="relative w-full max-w-[860px] min-h-[800px]">
          <!-- 탭 0 :Bing.p 회원 폼 -->
          <div v-show="activeTab === 0" class="absolute w-full">
            <!-- 이름 -->
            <div class="mb-4 flex flex-col items-center justify-center">
              <label
                for="name"
                class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >이름</label
              >
              <input
                id="name"
                v-model="formData.name"
                type="name"
                placeholder="* 이름을 입력해 주세요"
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            </div>
            <!-- 아이디 -->
            <div class="mb-4 flex flex-col items-center justify-center">
              <label
                for="id"
                class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >아이디</label
              >
              <input
                id="id"
                v-model="formData.id"
                type="id"
                placeholder="* 한글은 10자 , 영문은 20자 이내로 입력해 주세요."
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            </div>
            <!-- 비밀번호 -->

            <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
              <label
                for="password"
                class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >비밀번호 확인</label
              >
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder=" "
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            </div>
            <!-- 비밀번호 확인 -->
            <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
              <label
                for="password"
                class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >비밀번호</label
              >
              <input
                id="password"
                v-model="formData.passwordcheck"
                :type="showPassword ? 'text' : 'password'"
                placeholder=" "
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-12 top-11 text-right justify-start text-neutral-800 text-base font-normal font-['Pretendard']">
                {{ showPassword ? "숨기기" : "보기" }}
              </button>
            </div>
            <!-- 이메일 -->

            <div class="flex items-center space-x-2">
              <label for="email" class="w-20 font-semibold flex items-center">
                이메일
                <img class="ml-1 w-4 h-4" src="" alt="필수" />
              </label>

              <input
                id="mobile3"
                name="mobile[]"
                maxlength="4"
                type="text"
                placeholder=""
                class="border border-gray-300 rounded px-2 py-1 w-20 text-center" />

              <span>@</span>

              <input
                id="mobile2"
                name="mobile[]"
                maxlength="4"
                type="text"
                placeholder=""
                class="border border-gray-300 rounded px-2 py-1 w-20 text-center" />

              <span> </span>
              <select id="email" name="mobile[]" class="border border-gray-300 rounded px-2 py-1 w-20">
                <option value="010">직접입력</option>
                <option value="011">naver.com</option>
                <option value="016">goole.com</option>
                <option value="017">daum.net</option>
                <option value="018">naver.com</option>
                <option value="019">naver.com</option>
              </select>

              <button
                type="button"
                id="btn_action_verify_mobile"
                class="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                onclick="memberVerifyMobile.joinSendVerificationNumber(); return false;">
                중복확인
              </button>
            </div>
            <!-- 휴대폰 번호 -->

            <div class="flex items-center space-x-2">
              <label for="mobile1" class="w-20 font-semibold flex items-center">
                휴대전화
                <img class="ml-1 w-4 h-4" src="" alt="필수" />
              </label>

              <select id="mobile1" name="mobile[]" class="border border-gray-300 rounded px-2 py-1 w-20">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>

              <span>-</span>

              <input
                id="mobile2"
                name="mobile[]"
                maxlength="4"
                type="text"
                placeholder=""
                class="border border-gray-300 rounded px-2 py-1 w-20 text-center" />

              <span>-</span>

              <input
                id="mobile3"
                name="mobile[]"
                maxlength="4"
                type="text"
                placeholder=""
                class="border border-gray-300 rounded px-2 py-1 w-20 text-center" />

              <button
                type="button"
                id="btn_action_verify_mobile"
                class="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                onclick="memberVerifyMobile.joinSendVerificationNumber(); return false;">
                인증번호 전송
              </button>
            </div>

            <!-- 성공 메시지 예시 -->
            <small id="displaynone" class="hidden text-red-600 mt-1"></small>

            <ul
              id="result_send_verify_mobile_success"
              class="hidden mt-2 text-green-600 list-disc list-inside space-y-1">
              <li>인증번호가 발송되었습니다.</li>
              <li>인증번호를 받지 못하셨다면 휴대폰 번호를 확인해 주세요.</li>
            </ul>
            <!-- 주소 -->

            <ul class="ec-address">
              <li id="shippingRegist_country_wrap" class="displaynone" style="display: none">
                <select
                  id="ma_rcv_contry_code"
                  name="ma_rcv_contry_code"
                  class="displaynone gCheckbox60"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">국가/지역</option>
                  <option value="GH">가나(GHANA)</option>
                  <option value="GA">가봉(GABON)</option>
                  <option value="GY">가이아나(GUYANA)</option>
                  <option value="GM">감비아(GAMBIA)</option>
                  <option value="GT">과테말라(GUATEMALA)</option>
                  <option value="GD">그레나다(GRENADA)</option>
                  <option value="GE">그루지야(GEORGIA)</option>
                  <option value="GR">그리스(GREECE)</option>
                  <option value="GN">기니(GUINEA)</option>
                  <option value="GW">기니비소(GUINEA-BISSAU)</option>
                  <option value="NA">나미비아(NAMIBIA)</option>
                  <option value="NG">나이지리아(NIGERIA)</option>
                  <option value="ZA">남아프리카공화국(SOUTH AFRICA)</option>
                  <option value="AN">네덜란드(네덜란드령앤틸리스)(NETHERLANDS(ANTILLES))</option>
                  <option value="NL">네덜란드(네델란드)(NETHERLANDS)</option>
                  <option value="AW">네덜란드(아루바섬)(ARUBA)</option>
                  <option value="NP">네팔(NEPAL)</option>
                  <option value="NO">노르웨이(NORWAY)</option>
                  <option value="NZ">뉴질란드(NEW ZEALAND)</option>
                  <option value="NE">니제르(NIGER)</option>
                  <option value="NI">니카라과(NICARAGUA)</option>
                  <option value="KR" selected="">대한민국(KOREA (REP OF,))</option>
                  <option value="DK">덴마크(DENMARK)</option>
                  <option value="GL">덴마크(그린란드)(GREENLAND)</option>
                  <option value="FO">덴마크(페로즈제도)(FAROE ISLANDS)</option>
                  <option value="DO">도미니카공화국(DOMINICAN REPUBLIC)</option>
                  <option value="DM">도미니카연방(DOMINICA)</option>
                  <option value="DE">독일(GERMANY)</option>
                  <option value="TL">동티모르(TIMOR-LESTE)</option>
                  <option value="LA">라오스(LAO PEOPLE'S DEM REP)</option>
                  <option value="LR">라이베리아(LIBERIA)</option>
                  <option value="LV">라트비아(LATVIA)</option>
                  <option value="RU">러시아(RUSSIAN FEDERATION)</option>
                  <option value="LB">레바논(LEBANON)</option>
                  <option value="LS">레소토(LESOTHO)</option>
                  <option value="RO">루마니아(ROMANIA)</option>
                  <option value="LU">룩셈부르크(LUXEMBOURG)</option>
                  <option value="RW">르완다(RWANDA)</option>
                  <option value="LY">리비아(LIBYAN ARAB JAMAHIRIYA)</option>
                  <option value="LI">리첸쉬테인(LIECHTENSTEIN)</option>
                  <option value="LT">리투아니아(LITHUANIA)</option>
                  <option value="MG">마다가스카르(MADAGASCAR)</option>
                  <option value="MK">마케도니아(MACEDONIA)</option>
                  <option value="MW">말라위(MALAWI)</option>
                  <option value="MY">말레이지아(MALAYSIA)</option>
                  <option value="ML">말리(MALI)</option>
                  <option value="MX">멕시코(MEXICO)</option>
                  <option value="MC">모나코(MONACO)</option>
                  <option value="MA">모로코(MOROCCO)</option>
                  <option value="MU">모리셔스(MAURITIUS)</option>
                  <option value="MR">모리타니(MAURITANIA)</option>
                  <option value="MZ">모잠비크(MOZAMBIQUE)</option>
                  <option value="ME">몬테네그로(MONTENEGRO)</option>
                  <option value="MD">몰도바(MOLDOVA, REPUBLIC OF)</option>
                  <option value="MV">몰디브(MALDIVES)</option>
                  <option value="MT">몰타(MALTA)</option>
                  <option value="MN">몽고(MONGOLIA)</option>
                  <option value="US">미국(U.S.A)</option>
                  <option value="GU">미국(괌)(GUAM)</option>
                  <option value="MH">미국(마아샬제도)(MARSHALL ISLANDS)</option>
                  <option value="VI">미국(버진제도)(VIRGIN ISLANDS U.S.)</option>
                  <option value="WS">미국(사모아, 구 서사모아)(SAMOA)</option>
                  <option value="AS">미국(사모아제도)(AMERICAN SAMOA)</option>
                  <option value="MP">미국(사이판)(NORTHERN MARIANA ISLANDS)</option>
                  <option value="PW">미국(팔라우섬)(PALAU)</option>
                  <option value="PR">미국(푸에르토리코섬)(PUERTO RICO)</option>
                  <option value="MM">미얀마(MYANMAR)</option>
                  <option value="FM">미크로네시아(마이크로네시아)(MICRONESIA)</option>
                  <option value="VU">바누아투(VANUATU)</option>
                  <option value="BH">바레인(BAHRAIN)</option>
                  <option value="BB">바베이도스(BARBADOS)</option>
                  <option value="BS">바하마(BAHAMAS)</option>
                  <option value="BD">방글라데시(BANGLADESH)</option>
                  <option value="VE">베네수엘라(VENEZUELA)</option>
                  <option value="BJ">베넹(BENIN)</option>
                  <option value="VN">베트남(VIET NAM)</option>
                  <option value="BE">벨기에(BELGIUM)</option>
                  <option value="BY">벨라루스(BELARUS)</option>
                  <option value="BZ">벨리세(BELIZE)</option>
                  <option value="BA">보스니아헤르체코비나(Bosnia and Herzegovina)</option>
                  <option value="BW">보츠와나(BOTSWANA)</option>
                  <option value="BO">볼리비아(BOLIVIA)</option>
                  <option value="BF">부르키나파소(BURKINA FASO)</option>
                  <option value="BT">부탄(BHUTAN)</option>
                  <option value="BG">불가리아(BULGARIA(REP))</option>
                  <option value="BR">브라질(BRAZIL)</option>
                  <option value="BN">브루네이(나이)(BRUNEI DARUSSALAM)</option>
                  <option value="BI">브룬디(BURUNDI)</option>
                  <option value="SA">사우디아라비아(SAUDI ARABIA)</option>
                  <option value="CY">사이프러스(CYPRUS)</option>
                  <option value="SM">산마리노(SAN MARINO)</option>
                  <option value="SN">세네갈(SENEGAL)</option>
                  <option value="RS">세르비아/코소보(SERBIA/KOSOVO)</option>
                  <option value="SC">세이셸(SEYCHELLES)</option>
                  <option value="LC">세인트 루시아(SAINT LUCIA)</option>
                  <option value="VC">세인트빈센트그레나딘(SAINT VINCENT AND THE GRENADINES)</option>
                  <option value="KN">세인트키츠네비스(SAINT KITTS AND NEVIS)</option>
                  <option value="SB">솔로몬아일란드(SOLOMON ISLANDS)</option>
                  <option value="SR">수리남(SURINAME)</option>
                  <option value="LK">스리랑카(SRI LANKA)</option>
                  <option value="SZ">스와질랜드(SWAZILAND)</option>
                  <option value="SE">스웨덴(SWEDEN)</option>
                  <option value="CH">스위스(SWITZERLAND)</option>
                  <option value="ES">스페인(에스파니아)(SPAIN)</option>
                  <option value="SK">슬로바키아(SLOVAKIA)</option>
                  <option value="SI">슬로베니아(SLOVENIA)</option>
                  <option value="SL">시에라리온(SIERRA LEONE)</option>
                  <option value="SG">싱가포르(SINGAPORE)</option>
                  <option value="AE">아랍에미레이트연합국(UNITED ARAB EMIRATES)</option>
                  <option value="AM">아르메니아(ARMENIA)</option>
                  <option value="AR">아르헨티나(ARGENTINA)</option>
                  <option value="IS">아이슬란드(ICELAND)</option>
                  <option value="HT">아이티(HAITI)</option>
                  <option value="IE">아일란드(에이레)(IRELAND)</option>
                  <option value="AZ">아제르바이잔(AZERBAIJAN)</option>
                  <option value="AF">아프가니스탄(AFGHANISTAN)</option>
                  <option value="AD">안도라(ANDORRA)</option>
                  <option value="AL">알바니아(ALBANIA)</option>
                  <option value="DZ">알제리(ALGERIA)</option>
                  <option value="AO">앙골라(ANGOLA)</option>
                  <option value="AG">앤티과바부다(ANTIGUA AND BARBUDA)</option>
                  <option value="ER">에리트리아(ERITREA)</option>
                  <option value="EE">에스토니아(ESTONIA)</option>
                  <option value="EC">에콰도르(ECUADOR)</option>
                  <option value="SV">엘살바도르(EL SALVADOR)</option>
                  <option value="GB">영국(UNITED KINGDOM)</option>
                  <option value="MS">영국(몽세라)(MONTSERRAT)</option>
                  <option value="BM">영국(버뮤다섬)(BERMUDA)</option>
                  <option value="VG">영국(버진제도)(VIRGIN ISLANDS BRITISH)</option>
                  <option value="AI">영국(안귈라섬)(ANGUILLA)</option>
                  <option value="GI">영국(지브롤터)(GIBRALTAR)</option>
                  <option value="KY">영국(케이만제도)(CAYMAN ISLANDS)</option>
                  <option value="TC">영국(터크스케이코스제도)(TURKS AND CAICOS ISLANDS)</option>
                  <option value="YE">예멘(YEMEN)</option>
                  <option value="OM">오만(OMAN)</option>
                  <option value="NF">오스트레일리아(노퍽섬)(NORFOLK ISLAND)</option>
                  <option value="AU">오스트레일리아(호주)(AUSTRALIA)</option>
                  <option value="AT">오스트리아(AUSTRIA)</option>
                  <option value="HN">온두라스(HONDURAS)</option>
                  <option value="JO">요르단(JORDAN)</option>
                  <option value="UG">우간다(UGANDA)</option>
                  <option value="UY">우루과이(URUGUAY)</option>
                  <option value="UZ">우즈베크(UZBEKISTAN)</option>
                  <option value="UA">우크라이나(UKRAINE)</option>
                  <option value="ET">이디오피아(ETHIOPIA)</option>
                  <option value="IQ">이라크(IRAQ)</option>
                  <option value="IR">이란(IRAN(ISLAMIC REP))</option>
                  <option value="IL">이스라엘(ISRAEL)</option>
                  <option value="EG">이집트(EGYPT)</option>
                  <option value="IT">이탈리아(이태리)(ITALY)</option>
                  <option value="IN">인도(INDIA)</option>
                  <option value="ID">인도네시아(INDONESIA)</option>
                  <option value="JP">일본(JAPAN)</option>
                  <option value="JM">자메이카(JAMAICA)</option>
                  <option value="ZM">잠비아(ZAMBIA)</option>
                  <option value="CN">중국(CHINA(PEOPLE'S REP))</option>
                  <option value="MO">중국(마카오)(MACAU)</option>
                  <option value="HK">중국(홍콩)(HONG KONG)</option>
                  <option value="CF">중앙 아프리카(CENTRAL AFRICAN REPUBLIC)</option>
                  <option value="DJ">지부티(DJIBOUTI)</option>
                  <option value="ZW">짐바브웨(ZIMBABWE)</option>
                  <option value="TD">차드(CHAD)</option>
                  <option value="CZ">체코(CZECH REP)</option>
                  <option value="CL">칠레(CHILE)</option>
                  <option value="CM">카메룬(CAMEROON)</option>
                  <option value="CV">카보베르데(CAPE VERDE)</option>
                  <option value="KZ">카자흐(KAZAKHSTAN)</option>
                  <option value="QA">카타르(QATAR)</option>
                  <option value="KH">캄보디아(CAMBODIA)</option>
                  <option value="CA">캐나다(CANADA)</option>
                  <option value="KE">케냐(KENYA)</option>
                  <option value="CR">코스타리카(COSTA RICA)</option>
                  <option value="CI">코트디봐르(COTE D IVOIRE)</option>
                  <option value="CO">콜롬비아(COLOMBIA)</option>
                  <option value="CG">콩고(CONGO)</option>
                  <option value="CU">쿠바(CUBA)</option>
                  <option value="KW">쿠웨이트(KUWAIT)</option>
                  <option value="HR">크로아티아(CROATIA)</option>
                  <option value="KG">키르키즈스탄(KYRGYZSTAN)</option>
                  <option value="KI">키리바티(KIRIBATI)</option>
                  <option value="TH">타이(태국)(THAILAND)</option>
                  <option value="TW">타이완(대만)(TAIWAN)</option>
                  <option value="TJ">타지키스탄(TAJIKISTAN)</option>
                  <option value="TZ">탄자니아(TANZANIA(UNITED REP))</option>
                  <option value="TR">터키(TURKEY)</option>
                  <option value="TG">토고(TOGO)</option>
                  <option value="TO">통가(TONGA)</option>
                  <option value="TM">투르크메니스탄(TURKMENISTAN)</option>
                  <option value="TV">투발루(TUVALU)</option>
                  <option value="TN">튀니지(TUNISIA)</option>
                  <option value="TT">트리니다드토바고(TRINIDAD AND TOBAGO)</option>
                  <option value="PA">파나마(PANAMA(REP))</option>
                  <option value="PY">파라과이(PARAGUAY)</option>
                  <option value="PK">파키스탄(PAKISTAN)</option>
                  <option value="PG">파푸아뉴기니(PAPUA NEW GUINEA)</option>
                  <option value="PE">페루(PERU)</option>
                  <option value="PT">포르투갈(PORTUGAL)</option>
                  <option value="PL">폴란드(POLAND(REP))</option>
                  <option value="FR">프랑스(FRANCE)</option>
                  <option value="GP">프랑스(과데루프섬)(GUADELOUPE)</option>
                  <option value="GF">프랑스(기아나)(FRENCH GUIANA)</option>
                  <option value="NC">프랑스(뉴칼레도니아섬)(NEW CALEDONIA)</option>
                  <option value="RE">프랑스(레위니옹섬)(REUNION)</option>
                  <option value="MQ">프랑스(마르티니크섬)(MARTINIQUE)</option>
                  <option value="PF">프랑스(폴리네시아)(FRENCH POLYNESIA)</option>
                  <option value="FJ">피지(FIJI)</option>
                  <option value="FI">필란드(FINLAND)</option>
                  <option value="PH">필리핀(PHILIPPINES)</option>
                  <option value="HU">헝가리(HUNGARY(REP))</option>
                </select>
                <span id="shippingRegist_directInputCheck_wrap" class="ec-base-label displaynone">
                  <input id="shippingRegist_directInputCheck" name="shippingRegist_directInputCheck" type="checkbox" />
                  <label id="shippingRegist_directInputCheckLabel" for="shippingRegist_directInputCheckLabel"
                    >직접입력</label
                  >
                </span>
              </li>

              <li id="shippingRegist_state_wrap" class="displaynone" style="display: none">
                <select
                  id="stateListUs"
                  name="stateListUs"
                  class="displaynone"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">주/도를 선택해주세요</option></select
                ><select
                  id="stateListCa"
                  name="stateListCa"
                  class="displaynone"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">주/도를 선택해주세요</option></select
                ><input
                  id="state_name"
                  name="state_name"
                  placeholder="주/도"
                  fw-filter=""
                  class="inputTypeText displaynone"
                  type="text"
                  size="30"
                  maxlength="50"
                  disabled=""
                  style="display: none" />
              </li>

              <li id="shippingRegist_city_wrap" class="displaynone" style="display: none">
                <input
                  id="city_name"
                  name="city_name"
                  placeholder="시/군/도시"
                  fw-filter=""
                  class="inputTypeText displaynone"
                  type="text"
                  size="30"
                  maxlength="50"
                  disabled=""
                  style="display: none" />
              </li>

              <li id="shippingRegist_street_wrap" class="displaynone">
                <input
                  id="street_name"
                  name="street_name"
                  placeholder="ADDR.COMMON.FORMATSTREET.KR"
                  fw-filter=""
                  class="inputTypeText displaynone"
                  type="text"
                  size="30"
                  maxlength="50"
                  disabled=""
                  style="display: none" />
              </li>

              <li id="shippingRegist_area_wrap" class="ec-address-area displaynone" style="display: none">
                <select
                  id="si_name_addr"
                  name="si_name_addr"
                  class="displaynone"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">ADDR.COMMON.FORMATSELECT.STATE.KR</option></select
                ><select
                  id="ci_name_addr"
                  name="ci_name_addr"
                  class="displaynone"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">ADDR.COMMON.FORMATSELECT.CITY.KR</option></select
                ><select
                  id="gu_name_addr"
                  name="gu_name_addr"
                  class="displaynone"
                  disabled=""
                  fw-filter=""
                  style="display: none">
                  <option value="">ADDR.COMMON.FORMATSELECT.STREET.KR</option>
                </select>
              </li>

              <li id="shippingRegist_zipcode_wrap" class="ec-address-zipcode" style="">
                <input
                  id="address_zip1"
                  name="address_zip1"
                  placeholder="우편번호"
                  fw-filter=""
                  class="inputTypeText"
                  type="text"
                  maxlength="14"
                  style=""
                  readonly=""
                  fw-label="우편번호" />
                <button id="SearchAddress" class="btnBasic" type="button" style="cursor: pointer">주소검색</button
                ><span class="ec-base-label">
                  <input
                    id="nozip"
                    name="nozip"
                    class="displaynone"
                    type="checkbox"
                    disabled=""
                    style="display: none; cursor: unset"
                    fw-filter="" />
                  <label
                    id="shipping_regist_zipcode_check_label"
                    for="nozip"
                    class="displaynone"
                    disabled=""
                    style="display: none"
                    fw-filter=""
                    >우편번호 없음</label
                  > </span
                ><span id="shippingRegist_zipcodeNotFoundMsg_wrap" class="ec-base-label displaynone">
                  우편번호가 정확하지 않습니다. 다시 확인해 주세요.
                </span>
              </li>
              <li id="shippingRegist_baseAddr_wrap" class="" style="">
                <input
                  id="address_addr1"
                  name="address_addr1"
                  placeholder="기본주소"
                  fw-filter=""
                  class="inputTypeText"
                  type="text"
                  size="60"
                  maxlength="100"
                  style=""
                  readonly=""
                  fw-label="기본주소" />
              </li>
              <li id="shippingRegist_detailAddr_wrap" class="" style="">
                <input
                  id="address_addr2"
                  name="address_addr2"
                  placeholder="나머지 주소(선택 입력 가능)"
                  fw-filter=""
                  class="inputTypeText"
                  type="text"
                  size="60"
                  maxlength="255"
                  style=""
                  fw-label="나머지 주소(선택 입력 가능)" />
              </li>
            </ul>

            <div class="flex items-center px-8 gap-3 mb-4 text-sm">
              <label class="relative w-[38px] h-5 cursor-pointer">
                <input type="checkbox" v-model="formData.rememberMe" class="sr-only peer" />

                <!-- 배경 바 -->
                <div
                  class="w-full h-full bg-zinc-300 rounded-full transition-colors duration-200 peer-checked:bg-[#1456FD]"></div>

                <!-- 토글 핸들 -->
                <div
                  class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-[18px]"></div>
              </label>
              <span class="text-center justify-start text-neutral-800 text-base font-normal font-['Pretendard']"
                >로그인 상태 유지</span
              >
            </div>
          </div>
          <!-- 탭 1 :클리너 파트너 폼 -->
          <div v-show="activeTab === 1" class="absolute w-full">
            <div class="mb-4 flex flex-col items-center justify-center">
              <label
                for="email"
                class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >사원번호</label
              >
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="클리너 사원번호"
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            </div>

            <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
              <label
                for="password"
                class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
                >비밀번호</label
              >
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="비밀번호"
                required
                class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-12 top-11 text-right justify-start text-neutral-800 text-base font-normal font-['Pretendard']">
                {{ showPassword ? "숨기기" : "보기" }}
              </button>
            </div>

            <div class="flex items-center px-8 gap-3 mb-4 text-sm">
              <label class="relative w-[38px] h-5 cursor-pointer">
                <input type="checkbox" v-model="formData.rememberMe" class="sr-only peer" />

                <!-- 배경 바 -->
                <div
                  class="w-full h-full bg-zinc-300 rounded-full transition-colors duration-200 peer-checked:bg-[#1456FD]"></div>

                <!-- 토글 핸들 -->
                <div
                  class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-[18px]"></div>
              </label>
              <span class="text-center justify-start text-neutral-800 text-base font-normal font-['Pretendard']"
                >로그인 상태 유지</span
              >
            </div>
            
            <div class="relative mt-10 flex items-center justify-center">
              <button
                type="submit"
                class="w-96 h-12 border border-transparent bg-blue-600 rounded-lg text-white font-semibold hover:border-blue-600 hover:bg-white hover:text-[#262626] transition-colors">
                로그인
              </button>
            </div>
            <div class="w-full max-w-md mt-[20px] mx-auto">
              <div class="flex justify-center items-center space-x-6 relative">
                <!-- 비밀번호 찾기 -->
                <span
                  class="text-neutral-800 text-base font-medium font-['Pretendard'] hover:text-blue-600 transition-colors duration-200">
                  비밀번호 찾기
                </span>

                <!-- 구분선 1 -->
                <span class="w-px h-4 bg-stone-300"></span>

                <!-- 회원가입 -->
                <router-link
                  to="/BusinessJoin"
                  class="text-neutral-800 text-base font-medium font-['Pretendard'] cursor-pointer transition-colors duration-200">
                  회원가입
                </router-link>
              </div>

              <!-- 하단 가로선 -->
              <div class="mt-2 w-full h-px bg-stone-300"></div>
            </div>
            <!-- 최상위 부모: 가운데 정렬을 위한 flex 컨테이너 -->
            <div class="w-full flex justify-center items-center mt-10">
              <!-- 버튼 박스 -->
              <div
                class="w-96 h-12 rounded-lg border border-blue-600 flex justify-center items-center hover:bg-blue-600 transition-colors">
                <span class="text-zinc-800 text-base font-bold font-['Pretendard'] hover:text-white transition-colors">
                  사원번호 조회하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const tabs = ["개인회원", "비지니스회원"];
const activeTab = ref(0);

const formData = ref({
  email: "",
  password: "",
  partnerId: "",
  partnerPassword: "",
  managerId: "",
  managerPassword: "",
  role: "customer",
  rememberMe: false,
});

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const changeTab = (index) => {
  activeTab.value = index;
  if (index === 0) {
    formData.value.role = "customer";
  } else if (index === 1) {
    formData.value.role = "Worker";
  } else if (index === 2) {
    formData.value.role = "Manager";
  }

  // 탭 변경 시 폼 초기화
  formData.value.email = "";
  formData.value.password = "";
  formData.value.partnerId = "";
  formData.value.partnerPassword = "";
  formData.value.managerId = "";
  formData.value.managerPassword = "";
  formData.value.rememberMe = false;
};

const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let user;

  if (activeTab.value === 0) {
    user = users.find(
      (u) =>
        u.email === formData.value.email && u.password === formData.value.password && u.role === formData.value.role
    );
  } else if (activeTab.value === 1) {
    user = users.find(
      (u) =>
        u.email === formData.value.partnerId &&
        u.password === formData.value.partnerPassword &&
        u.role === formData.value.role
    );
  } else {
    user = null;
  }

  if (user) {
    authStore.login(user);

    if (user.role === "Worker") {
      router.push("/Worker");
    } else if (user.role === "Manager") {
      router.push("/Manager");
    } else if (user.role === "customer") {
      router.push("/BingPrime");
    } else {
      router.push("/");
    }
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};
</script>
<style scoped>
.active-tab {
  color: black;
  border: 2px solid #292929; /* 전체 보더 */
  border-bottom: none; /* 젤 아래선 없애기 */
}

.inactive-tab {
  color: #9ca3af; /* text-gray-400 */
  border: 1px solid #bdbdbd; /* 전체 보더 밝은 회색 1px */
  border-bottom: 2px solid #292929; /* 젤 아래선 진한 회색 1.5px */
}
</style>

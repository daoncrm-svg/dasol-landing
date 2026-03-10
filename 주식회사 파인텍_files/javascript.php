
//플래시 링크경로
function GoMenu(name) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		if(name == 'admin' || name == 'manager')	document.location.href = eval(name)+'?SITE_ID=jcapital2&skin_num=iweb-YNa006';
		else if(name == 'logout')	document.location.href = eval(name)+'?userid=/skins/iweb-YNa006';
		else	document.location.href = "/skins/iweb-YNa006"+eval(name);
	}
}

function GoMenuBlank(name) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		openNewWindow = window.open("about:blank");

		if(name == 'admin' || name == 'manager')	openNewWindow.location.href = eval(name);
		else if(name == 'logout')	openNewWindow.location.href = eval(name)+'?userid=/skins/iweb-YNa006';
		else	openNewWindow.location.href = "/skins/iweb-YNa006"+eval(name);
	}
}

//로그인페이지(로그인후 페이지이동)
function GoMenuLogin(name,c1,c2) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?backCade01="+c1+"&backCade02="+c2;
	}
}

//로그인페이지(로그인후 backUrl 페이지이동)
function GoMenuLoginBackUrl(name,c1,c2,bk) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?backCade01="+c1+"&backCade02="+c2+"&backUrl="+bk;
	}
}

//서브 일반페이지
function GoSubMenu(name,c1,c2) {

	if(name.includes('blockOrder')){

		
		document.location.href = "/skins/iweb-YNa006"+'/main.php?mCade01=&mCade02=&SITE_ID=jcapital2&skin_num=iweb-YNa006&blockScrollingSub='+name;
	}

    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {



		if(name == 'home'){
			document.location.href = "/skins/iweb-YNa006"+eval(name)+'&SITE_ID=jcapital2&skin_num=iweb-YNa006';
		}else{
			frm = document.frm_global_menu;
			frm.mCade01.value = c1;
			frm.mCade02.value = c2;
			frm.target='';
			frm.action = "/skins/iweb-YNa006"+eval(name);
			frm.submit();
		}
	}
}

//서브 일반페이지 변수전송
function GoSubMenuVars(name,c1,c2,vars) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&"+vars;
	}
}

//서브 별도결제
function GoSubPayment(name,c1,c2,c3) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		if(name == 'home')	document.location.href = "/skins/iweb-YNa006"+eval(name)
		else	document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&click_pay="+c3;
	}
}

//서브 게시판페이지
function GoSubBoard(name,c1,c2,tab) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		frm = document.frm_global_menu;
		frm.mCade01.value = c1;
		frm.mCade02.value = c2;
		frm.table_id.value = tab;
		frm.target='';
		frm.action = "/skins/iweb-YNa006"+eval(name);
		frm.submit();
	}
}

//서브 게시판페이지(새창)
function GoSubBoardBlank(name,c1,c2,tab) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		frm = document.frm_global_menu;
		frm.mCade01.value = c1;
		frm.mCade02.value = c2;
		frm.table_id.value = tab;
		frm.target='_blank';
		frm.action = "/skins/iweb-YNa006"+eval(name);
		frm.submit();
	}
}

//서브 게시판페이지
function GoSubBoardView(name,c1,c2,tab,uid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		frm = document.frm_global_menu;
		frm.mCade01.value = c1;
		frm.mCade02.value = c2;
		frm.table_id.value = tab;
		frm.uid.value = uid;
		frm.type.value = 'view';
		frm.target='';
		frm.action = "/skins/iweb-YNa006"+eval(name);
		frm.submit();
	}
}


//서브 게시판페이지(새창)
function GoSubBoardViewBlank(name,c1,c2,tab,uid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		frm = document.frm_global_menu;
		frm.mCade01.value = c1;
		frm.mCade02.value = c2;
		frm.table_id.value = tab;
		frm.uid.value = uid;
		frm.type.value = 'view';
		frm.target='_blank';
		frm.action = "/skins/iweb-YNa006"+eval(name);
		frm.submit();
	}
}

//서브 쇼핑몰상세페이지
function GoSubShopView(name,c1,c2,uid){
	document.location.href = 
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&type=view&uid="+uid;
}

//서브 게시판페이지 변수전송
function GoSubBoardVars(name,c1,c2,tab,vars) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&table_id="+tab+"&"+vars;
	}
}



//구매후기 작성페이지
function GoSubOrderReview(name,c1,c2,tab,point,pid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&table_id="+tab+"&order_review_point="+point+"&type=write&order_review_uid="+pid;
	}
}

//구매후기 작성페이지에서 상품상세페이지로...
function GoSubOrderReviewProduct(name,c1,c2,pid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&type=view&uid="+pid;
	}
}

//상품문의 작성페이지
function GoSubOrderQna(name,c1,c2,tab,pid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		document.location.href = "/skins/iweb-YNa006"+eval(name)+"?mCade01="+c1+"&mCade02="+c2+"&table_id="+tab+"&type=write&product_qna_uid="+pid;
	}
}

//회원탈퇴
function GoSecede(){
	sform = document.frm_secede;
	site_id = sform.site_id.value;
	userid = sform.userid.value;

	if(site_id && userid){
		if(confirm('회원탈퇴를 신청하시겠습니까?')){
			sform.type.value = 'secede';
			sform.target = 'ifra_secede';
			sform.action = '/skins/member/proc.php';
			sform.submit();
		}
	}
}

//게시판 읽기권한이 없는경우
function GoBoardLogin(name,userid) {
    if (eval(name) == "") {
        alert("서비스 준비중입니다.");
        return;    
    } else {
		if(userid)	 return;
		else	document.location.href = "/skins/iweb-YNa006"+eval(name);
	}
}

//일반페이지 탭메뉴적용
function SwapDivSetContent(n){
	Obj = document.getElementsByName('SwapLayer[]');

	for(i=0; i<Obj.length; i++){
		if(i == n)	 Obj[i].style.display = '';
		else	Obj[i].style.display = 'none';
	}
}


//시작페이지설정
function StartHomePage(url){
	startpage.style.behavior='url(#default#homepage)';
	startpage.setHomePage(url);
}



// 탑메뉴
	var home="/main.php?mCade01=&mCade02=";													// HOME
	var login="/subpage/login.php?SITE_ID=jcapital2&skin_num=iweb-YNa006";							// 로그인
	var join="/subpage/sub_member.php?SET_PAGE_MTYPE=join&SITE_ID=jcapital2&skin_num=iweb-YNa006";							// 회원가입
	var logout="/skins/module/login/logout_proc.php";								// 로그아웃
	var join_modify="/member/member.php?type=edit&mNum=7&sNum=6";			// 회원정보수정
	var IDsearch = "javascript:id_pwd_search();";							//id pwd 찾기
if('2'=='1'){
	var admin="/manager/";													// 관리자
}else if('2'=='2'){
	var admin="/adminTool/";													// 관리자
}else{
	var admin="/webmaster/";													// 관리자
}

	var manager="/manager/";													// 관리자
	var cart="/subpage/sub01.php?SET_PAGE_MTYPE=cart&SITE_ID=jcapital2&skin_num=iweb-YNa006";								//장바구니(쇼핑몰)
	var orderlist="/subpage/sub01.php?SET_PAGE_MTYPE=orderlist&SITE_ID=jcapital2&skin_num=iweb-YNa006";					//주문내역(쇼핑몰)
	var point="/subpage/sub01.php?SET_PAGE_MTYPE=point";							//나의적립금
	var coupon="/subpage/sub01.php?SET_PAGE_MTYPE=coupon";						//나의쿠폰
	var tour_cart="/subpage/sub01.php?SET_PAGE_MTYPE=tour_cart";				//장바구니(여행상품몰)
	var tour_orderlist="/subpage/sub01.php?SET_PAGE_MTYPE=tour_orderlist";		//예약내역(여행상품몰)
	var board_wish="/subpage/board_wish.php";												//게시판 찜하기


// 서브페이지
	var sub01="/subpage/sub01.php";		// 일반페이지
	var sub02="/subpage/sub02.php";		// 게시판페이지
	var sub03="/subpage/sub03.php";		// 쇼핑몰페이지
	var sub04="/subpage/sub04.php";		// 여행상품페이지

	var policy01="/subpage/sub_member.php?mtype=policy01";	// 이용약관
	var policy02="/subpage/sub_member.php?mtype=policy02";	// 개인정보처리방침
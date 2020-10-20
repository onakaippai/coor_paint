var CdeTabObj, GrfTabObj;
var CurPthObj, TtlCdeObj;
var CurCnvObj, TtlSvgObj;
function CdeTabClk(TabBnt, CdeEdt){
	CdeTabObj.children[0].style.borderTopColor = "White";
	CdeTabObj.children[0].style.borderBottomColor = "White";
	CdeTabObj.children[1].style.borderTopColor = "White";
	CdeTabObj.children[1].style.borderBottomColor = "White";
	CurPthObj.style.display = "none";
	TtlCdeObj.style.display = "none";
	TabBnt.style.borderTopColor = "Grey";
	TabBnt.style.borderBottomColor = "Gainsboro";
	CdeEdt.style.display = "block";
}
function GrfTabClk(TabBnt, GrfVwr){
	GrfTabObj.children[2].style.borderTopColor = "White";
	GrfTabObj.children[2].style.borderBottomColor = "White";
	GrfTabObj.children[3].style.borderTopColor = "White";
	GrfTabObj.children[3].style.borderBottomColor = "White";
	CurCnvObj.style.display = "none";
	TtlSvgObj.style.display = "none";
	TabBnt.style.borderTopColor = "Grey";
	TabBnt.style.borderBottomColor = "Gainsboro";
	GrfVwr.style.display = "block";
}
function SetupClk(){
	var GrfWth, GrfHgt, ZomPct;
	GrfWth = parseInt(GrfTabObj.children[0].children[0].textContent, 10);
	GrfHgt = parseInt(GrfTabObj.children[0].children[1].textContent, 10);
	ZomPct = parseInt(GrfTabObj.children[1].children[0].textContent, 10);
	TtlSvgObj.setAttribute("width", String(GrfWth));
	TtlSvgObj.setAttribute("height", String(GrfHgt));
	TtlSvgObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	GrfWth = Math.floor(GrfWth * ZomPct / 100);
	GrfHgt = Math.floor(GrfHgt * ZomPct / 100);
	CurCnvObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	CurCnvObj.width = String(GrfWth);
	CurCnvObj.height = String(GrfHgt);
}
function PreLoad(){
	CdeTabObj = document.getElementById("CdeTab");
	GrfTabObj = document.getElementById("GrfTab");
	CurPthObj = document.getElementById("CurPth");
	TtlCdeObj = document.getElementById("TtlCde");
	CurCnvObj = document.getElementById("CurCnv");
	TtlSvgObj = document.getElementById("TtlSvg");
	CdeTabObj.children[0].addEventListener("click", function(){
		CdeTabClk(CdeTabObj.children[0], CurPthObj);
	}, false);
	CdeTabObj.children[1].addEventListener("click", function(){
		CdeTabClk(CdeTabObj.children[1], TtlCdeObj);
	}, false);
	GrfTabObj.children[2].addEventListener("click", function(){
		GrfTabClk(GrfTabObj.children[2], CurCnvObj);
	}, false);
	GrfTabObj.children[3].addEventListener("click", function(){
		GrfTabClk(GrfTabObj.children[3], TtlSvgObj);
	}, false);
	GrfTabObj.children[4].addEventListener("click", SetupClk, false);
	CdeTabClk(CdeTabObj.children[0], CurPthObj);
	GrfTabClk(GrfTabObj.children[2], CurCnvObj);
	SetupClk();
}
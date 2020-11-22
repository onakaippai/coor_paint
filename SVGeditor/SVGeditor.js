var CdeTabObj, GrfTabObj;
var CurPthObj, TtlCdeObj;
var CurSvgObj, TtlSvgObj;
var Coor, Info, Code, DrewCur, DrewTtl;
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
	CurSvgObj.style.display = "none";
	TtlSvgObj.style.display = "none";
	TabBnt.style.borderTopColor = "Grey";
	TabBnt.style.borderBottomColor = "Gainsboro";
	GrfVwr.style.display = "block";
}
function DrawClk(){
    if (CurPthObj.style.display == "block"){
        if (Coor == null){
            alert("The current path is WRONG!");        
        }
        else{
            if (DrewTtl){
                var tmp = "";
                if (TtlCdeObj.innerHTML.length > 0){
                    tmp += GetImageCode(TtlSvgObj.outerHTML, TtlSvgObj.getAttribute("height"), CurSvgObj.getAttribute("width"), CurSvgObj.getAttribute("height"));
                }
                var p;
                p = GetPathCode(Info, TtlSvgObj.getAttribute("width"), TtlSvgObj.getAttribute("height"), CurSvgObj.getAttribute("width"), CurSvgObj.getAttribute("height"));
                tmp += p.Code; 
                Code = p.Path;
                tmp += GetPointCode(Coor, TtlSvgObj.getAttribute("width"), CurSvgObj.getAttribute("width"));
                DrewCur = true;
                CurSvgObj.innerHTML = tmp;
            }
            else{
                alert("Draw the total code first, please!");  
            }
        }
    }
    else{
        TtlSvgObj.innerHTML = TtlCdeObj.textContent;
        if (TtlCdeObj.innerHTML.length > 0){
            CurSvgObj.innerHTML = GetImageCode(TtlSvgObj.outerHTML, TtlSvgObj.getAttribute("height"), CurSvgObj.getAttribute("width"), CurSvgObj.getAttribute("height"));
        }
        DrewTtl = true;
    }
}
function KeepClk(){
    if (DrewCur){
        TtlSvgObj.innerHTML += Code+"\n";
        TtlCdeObj.textContent = TtlSvgObj.innerHTML;
        CurPthObj.innerHTML = "";
        if (TtlCdeObj.innerHTML.length > 0){
            CurSvgObj.innerHTML = GetImageCode(TtlSvgObj.outerHTML, TtlSvgObj.getAttribute("height"), CurSvgObj.getAttribute("width"), CurSvgObj.getAttribute("height"));
        }
        DrewCur = false;
        Coor = null;
    }
    else{
        alert("Draw the current path first, please!");  
    }
}
function SetupClk(){
	var GrfWth, GrfHgt, ZomPct;
	GrfWth = parseInt(GrfTabObj.children[0].children[0].value, 10);
	GrfHgt = parseInt(GrfTabObj.children[0].children[1].value, 10);
	ZomPct = parseInt(GrfTabObj.children[1].children[0].value, 10);
    if ((GrfWth > 400) || (GrfHgt > 400) || (GrfWth*ZomPct/100 > 400) || (GrfHgt*ZomPct/100 > 400)){
        alert("The Canvas size is too large!");
        return;
    }
	TtlSvgObj.setAttribute("width", String(GrfWth));
	TtlSvgObj.setAttribute("height", String(GrfHgt));
	TtlSvgObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	GrfWth = Math.floor(GrfWth * ZomPct / 100);
	GrfHgt = Math.floor(GrfHgt * ZomPct / 100);
	CurSvgObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	CurSvgObj.setAttribute("width", String(GrfWth));
	CurSvgObj.setAttribute("height", String(GrfHgt));
    if ((CurPthObj.innerHTML.length > 0) && DrewCur) DrawClk();
}
function CurPthChange(){
    Coor = null;
    if (CurPthObj.textContent.length == 0) return;
    var Position, tmp, i, j;
    for(i = CurPthObj.children.length; i--; ) {
        if (CurPthObj.children[i].hasAttribute("class")){            
            if ((CurPthObj.children[i].getAttribute("class") == "space") || (CurPthObj.children[i].getAttribute("class") == "hint")){
                CurPthObj.removeChild(CurPthObj.children[i]);
            }
        }
    }
    Position = getCaretCharacterOffsetWithin(CurPthObj);
    Info     = ExtractInfo(CurPthObj.innerText);
    tmp      = FormatCode(Info, CurPthObj.innerText);
    Coor     = tmp.Coor;
    CurPthObj.innerHTML = tmp.FormattedCode;
    setCaretPosition(CurPthObj, Position);
    DrewCur = false;
}
function PreLoad(){
	CdeTabObj = document.getElementById("CdeTab");
	GrfTabObj = document.getElementById("GrfTab");
	CurPthObj = document.getElementById("CurPth");
	TtlCdeObj = document.getElementById("TtlCde");
	CurSvgObj = document.getElementById("CurSvg");
	TtlSvgObj = document.getElementById("TtlSvg");
	CdeTabObj.children[0].addEventListener("click", function(){
		CdeTabClk(CdeTabObj.children[0], CurPthObj);
	}, false);
	CdeTabObj.children[1].addEventListener("click", function(){
		CdeTabClk(CdeTabObj.children[1], TtlCdeObj);
	}, false);
	GrfTabObj.children[2].addEventListener("click", function(){
		GrfTabClk(GrfTabObj.children[2], CurSvgObj);
	}, false);
	GrfTabObj.children[3].addEventListener("click", function(){
		GrfTabClk(GrfTabObj.children[3], TtlSvgObj);
	}, false);
	CurPthObj.addEventListener("input", CurPthChange, false);    
    CurPthObj.addEventListener('keydown', function(e){
        PressEnter(e);
    }, false);
    CurPthObj.addEventListener("paste", function(e) {
        CopyPaste(e);        
    });    
    TtlCdeObj.addEventListener('input', function(){
        DrewTtl = false;
    }, false);
    TtlCdeObj.addEventListener('keydown', function(e){
        PressEnter(e);
    }, false);
    TtlCdeObj.addEventListener("paste", function(e) {
        CopyPaste(e);        
    });
	CdeTabObj.children[2].addEventListener("click", DrawClk, false);    
	CdeTabObj.children[3].addEventListener("click", KeepClk, false);
    GrfTabObj.children[4].addEventListener("click", SetupClk, false);
	CdeTabClk(CdeTabObj.children[0], CurPthObj);
	GrfTabClk(GrfTabObj.children[2], CurSvgObj);
	SetupClk();
    DrewCur  = false;
    DrewTtl  = true;
}
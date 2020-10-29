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
function DrawClk(){
}
function KeepClk(){
}
function SetupClk(){
	var GrfWth, GrfHgt, ZomPct;
	GrfWth = parseInt(GrfTabObj.children[0].children[0].value, 10);
	GrfHgt = parseInt(GrfTabObj.children[0].children[1].value, 10);
	ZomPct = parseInt(GrfTabObj.children[1].children[0].value, 10);
	TtlSvgObj.setAttribute("width", String(GrfWth));
	TtlSvgObj.setAttribute("height", String(GrfHgt));
	TtlSvgObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	GrfWth = Math.floor(GrfWth * ZomPct / 100);
	GrfHgt = Math.floor(GrfHgt * ZomPct / 100);
	CurCnvObj.style.marginTop = String((480 - GrfHgt) / 2) + "px";
	CurCnvObj.width = String(GrfWth);
	CurCnvObj.height = String(GrfHgt);
}
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function setCaretPosition(element, offset) {
    var range = document.createRange();
    var sel = window.getSelection();

    //select appropriate node
    var currentNode = null;
    var previousNode = null;

    for (var i = 0; i < element.childNodes.length; i++) {
        //save previous node
        previousNode = currentNode;

        //get current node
        currentNode = element.childNodes[i];
        //if we get span or something else then we should get child node
       while(currentNode.childNodes.length > 0){
          currentNode = currentNode.childNodes[0];
       }

        //calc offset in current node
        if (previousNode != null) {
            offset -= previousNode.length;
        }
        //check whether current node has enough length
        if (offset <= currentNode.length) {
            break;
        }
    }
    //move caret to specified offset
    if (currentNode != null) {
        range.setStart(currentNode, offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
function CurPthChange(CdeEdt){
    //var Info, Flag, Coor;    
    //Info = ExtractInfo(CdeEdt.innerHTML);
    //Flag = FormatCode(CdeEdt.innerHTML, info);
    //if (Flag){
    //    Coor = ExtractCoor(Info);
    //}
    var position = getCaretCharacterOffsetWithin(CdeEdt);
    CdeEdt.innerHTML = "<span style=\"color:blue\">"+CdeEdt.textContent+"</span>";    
    setCaretPosition(CdeEdt, position);
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
	CurPthObj.addEventListener("keyup", function(){
		CurPthChange(CurPthObj);
	}, false);
	//CdeTabObj.children[2].addEventListener("click", DrawClk, false);    
	//CdeTabObj.children[3].addEventListener("click", KeepClk, false);
    GrfTabObj.children[4].addEventListener("click", SetupClk, false);
    //CurPthObj.children[0].addEventListener("change", CurPthChange, false);
	CdeTabClk(CdeTabObj.children[0], CurPthObj);
	GrfTabClk(GrfTabObj.children[2], CurCnvObj);
	SetupClk();
}
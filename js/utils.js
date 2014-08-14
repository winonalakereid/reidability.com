var treeGridCounter = 2;
var testString = "Hello World!!!!";
var uploadedImgPath;
var selected = 1;
var tempParent;
var foundParent = false;
var foundSelected = false;
$(document).ready(function () {
    $("#addElements button").on("click", function () {
        var elementTag = $(this)[0].id;
        if (elementTag == "img") {
            $("#addElements").after("<div id='imgUploadRow' class='row'><h3>Add Image</h3><input id='imgUpload' class='form-contorl' type='file'/><br><button id='addImage' class='btn btn-primary'>Add Image</button></div>");
            $("#addImage").on("click", function () {
                uploadedImgPath = $("#imgUpload").val();
                //right here we will have to make an ajax 
                //$("#htmlEditor").append("<img src='" + uploadedImgPath + "' />");
                //$("#imgUploadRow").remove();
            }); 
            console.log("adding img " + selected + ":" + treeGridCounter);
            addTreeNode("img", "n/a", "n/a", selected);
        } else if (elementTag == "table") {
            console.log("adding table " + selected + ":" + treeGridCounter);
            addTreeNode("table", "n/a", "n/a", selected);
        } else if (elementTag == "video") {
            console.log("adding video " + selected + ":" + treeGridCounter);
            addTreeNode("video", "n/a", "n/a", selected);
        } else if (elementTag == "row") {
            console.log("adding row " + selected + ":" + treeGridCounter);
            addTreeNode("div", "row", "n/a", selected);
        } else if (elementTag == "p") {
            console.log("adding p " + selected + ":" + treeGridCounter);
            $("#htmlEditor").append("<div><" + elementTag + " contenteditable>" + testString + "</" + elementTag + "></div>");
            //addTreeNode("div", "n/a", "n/a", selected);
            addTreeNode(elementTag, "n/a", "n/a", selected);
        } else {
            console.log("adding other " + selected);
            $("#htmlEditor").append("<" + elementTag + " contenteditable>" + testString + "</" + elementTag + ">");
            addTreeNode(elementTag, "n/a", "n/a", selected);
        }
    });
    $("#removeNode").on("click", function () {
        console.log("clicked remove button " + selected + ":" + treeGridCounter);
        $("#elementTree").find('tr').each(function () {
            if (foundSelected) {
                console.log("selected was found " + selected + ":" + treeGridCounter);
                var classNumbers = $(this)[0].className.replace(/[A-Za-z$-]/g, "").split(" ");
                if (classNumbers[1] < selected) {
                    console.log("should be the end of this branch " + selected + ":" + treeGridCounter);
                    foundSelected = false;
                    return;
                } else {
                    console.log("removing node" + selected + ":" + treeGridCounter);
                    $("#elementTree .treegrid-" + classNumbers[0]).remove();
                }
            } else {
                console.log("haven't found selected " + selected + ":" + treeGridCounter);
                if ($(this)[0].className.replace(/[A-Za-z$-]/g, "")[0] == selected) {
                    foundSelected = true;
                    console.log("Just found selected " + selected + ":" + treeGridCounter);
                    $("#elementTree .treegrid-" + selected).remove();
                }
            }
        });
        
    });
        

    
});

function addTreeNode(element, classes, id, parent) {
    console.log("here we are adding a node " + selected + ":" + treeGridCounter);
    console.log("this is also the parent being passed in" + parent + ":" + treeGridCounter);
    var tree = $("#elementTree");
    var elementTD = "<td>" + element + "</td>";
    var idTD = "<td contenteditable>"+ id +"</td>";
    var classesTD = "<td contenteditable>" + classes + "</td>";
   if (parent == 1) {
        tree.append("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-1'>" + elementTD + classesTD + idTD + "</tr>");
   } else {
       $("#elementTree").find('tr').each(function () {
           var classNumbers = $(this)[0].className.replace(/[A-Za-z$-]/g, "").split(" ");
           if (foundParent) {
               console.log("parent class number is: " + classNumbers[1] + " parent number is: " + parent);
               if (classNumbers[1] < parent) {
                   $(this).before("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-" + parent + "'>" + elementTD + classesTD + idTD + "</tr>");
                   foundParent = false;
                   return;
               }
           } else {
               console.log("class number varialbe is: " + classNumbers[0] + " stripped number is: " + $(this)[0].className.replace(/[A-Za-z$-]/g, "")[0] + " parent is : " + parent);
               if ($(this)[0].className.replace(/[A-Za-z$-]/g, "")[0] == parent) {
                   
                   foundParent = true;
                   console.log(foundParent);
               }
           }
       });
    }
    
    if (parent != undefined) {
        $("#elementTree").treegrid();
        $(".treegrid-1").treegrid("render");
    }
    treeNodeClick();
    treeGridCounter++;
}

function treeNodeClick() {
    $("#elementTree [class*=treegrid]").on("click", function () {
        if ($("#elementTree .active").length) {
            $("#elementTree .active").each(function () {
                $(this).removeClass("active");
            });
        }
        console.log("this was click selected hasn't been updated" + selected);
        $(this).addClass("active");
        console.log($(this)[0].className.replace(/[A-Za-z$-]/g, "") + ":" + treeGridCounter);
        var classNumbers = $(this)[0].className.replace(/[A-Za-z$-]/g, "").split(" ");
        selected = classNumbers[0];
        console.log("now selected has been changed " + selected + ":" + treeGridCounter);
    });
}
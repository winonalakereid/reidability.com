var treeGridCounter = 2;
var testString = "Hello World!!!!";
var uploadedImgPath;
var selected = 1;
var tempParent;
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
            addTreeNode("img", "n/a", "n/a", selected);
        } else if (elementTag == "table") {
            addTreeNode("table", "n/a", "n/a", selected);
        } else if (elementTag == "video") {
            addTreeNode("video", "n/a", "n/a", selected);
        } else if (elementTag == "row") {
            addTreeNode("div", "row", "n/a", selected);
        } else if (elementTag == "p") {
            console.log(elementTag);
            $("#htmlEditor").append("<div><" + elementTag + " contenteditable>" + testString + "</" + elementTag + "></div>");
            addTreeNode("div", "n/a", "n/a", selected);
            tempParent = parseInt(selected) + parseInt(1);
            addTreeNode(elementTag, "n/a", "n/a", tempParent);
        } else {
            $("#htmlEditor").append("<" + elementTag + " contenteditable>" + testString + "</" + elementTag + ">");
            addTreeNode(elementTag, "n/a", "n/a", selected);
        }
    });
    $("#removeNode").on("click", function () {
        $("#elementTree .treegrid-" + selected).remove();
    });
        

    
});

function addTreeNode(element, classes, id, parent) {
    var tree = $("#elementTree");
    var elementTD = "<td>" + element + "</td>";
    var idTD = "<td contenteditable>"+ id +"</td>";
    var classesTD = "<td contenteditable>" + classes + "</td>";
    if (parent == 1) {
        tree.append("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-1'>" + elementTD + classesTD + idTD + "</tr>");
    } else {
        if ($(".treegrid-parent-" + parent).length) {
            console.log("do I ever get here");
            console.log($(".treegrid-" + parent).treegrid('getChildNodes'));
            $(".treegrid-parent-" + parent + ":last").after("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-"+ parent +"'>" + elementTD + classesTD + idTD + "</tr>");
        } else {
            console.log("actually I don't think I will ever get here");
            console.log($(".treegrid-" + parent).treegrid('getChildNodes'));
            $(".treegrid-" + parent ).after("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-" + parent + "'>" + elementTD + classesTD + idTD + "</tr>");
        }
        //$(".treegrid-" + parent).find('tr').each(function () {
        //    console.log($(this));
        //    //if ($(this).treegrid("isLast")) {
        //    //    $(this).after("<tr class= 'treegrid-" + treeGridCounter + " treegrid-parent-" + parent + "'>" + elementTD + classesTD + idTD + "</tr>");
        //    //}
        //});
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
        $(this).addClass("active");
        selected = $(this)[0].className.replace(/[A-Za-z$-]/g, "")[0];
        console.log(selected);
    });
}
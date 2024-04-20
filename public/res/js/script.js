Cortona3DSolo.use('drawing', {
    element: document.getElementById('solo-svg')
});

// Cortona Setup
Cortona3DSolo.use('core', {
    totalMemory: totalMemoryValue,
    element: document.getElementById('solo-canvas'),
    prefixURL: baseUri + '/' + resFolder + '/Redistributables/',
    features: Cortona3DSolo.app.ENABLE_NAVIGATION_FIT_TO_OBJECT | Cortona3DSolo.app.DRAWING_HOTSPOT_HIGHLIGHT_SOLID
});
Cortona3DSolo.use('touch');

/*Check interactiviy exist, then initialize*/
if (propInteractivityName != "") {
    Cortona3DSolo.app.initialize(propInteractivityName);
} else {
    Cortona3DSolo.app.initialize();
}
var m_didSelectHotspotInvoked = false;
var lastElemClicked;

//Move Into React
function ContentSetUp() {
    $(".cortona3dsolo-svg").detach().prependTo("#MainDiv")
    $("div.tiramisu-panel-group").detach().prependTo("#MainDiv")
    $("#solo-canvas").detach().prependTo("#MainDiv")
}
function PartTable(table) {
    document.getElementById('part-table-container').innerHTML = table;
    Cortona3DSolo.app.ipc.dpl.setupTable(document.getElementById('dpl-table'));
    
    $('table.dpl-table > tbody').find('tr:not([data-index])').remove();
    $('table.dpl-table').find('td:first-child').remove();

    //Change columns size
    $('table.dpl-table td').removeAttr("width");
    $('table.dpl-table td.no-display').remove();
    $('table.dpl-table > colgroup > col:nth-child(1)').remove();
    $('table.dpl-table > colgroup > col:nth-child(2)').attr("width", "33%");
    $('table.dpl-table > colgroup > col:nth-child(3)').attr("width", "33%");
    $('table.dpl-table > colgroup > col:nth-child(5)').attr("width", "25%");
    
    //change dpl table header text based on language
    $('table.dpl-table > thead td > pre').remove();
    $('table.dpl-table > thead td:nth-child(1)').text((window.itemHeader));
    $('table.dpl-table > thead td:nth-child(2)').text((window.partNumberHeader));
    $('table.dpl-table > thead td:nth-child(3)').text((window.descriptionHeader));
    $('table.dpl-table > thead td:nth-child(4)').text((window.qtyHeader));
    $('table.dpl-table > thead td:nth-child(5)').text((window.remarksHeader));
}

function displayType() {
    if (window.displayType == 0) {
        // 2D mode
        window.Cortona3DSolo.app.ipc.toggleDrawingDisplayMode(true);
        window.setSelectToggleImage(true)
    } else if (window.displayType == 1) {
        // 3D mode
        window.Cortona3DSolo.app.ipc.toggleDrawingDisplayMode(false);
    }

    
    // var ipcSvg = hasDrawing();
    // if (!ipcSvg || window.displayType == 0) {
    //     window.setDisableToggleImage(true)
    // } else {
    //     // has 2D image
    //     window.setDisableToggleImage(false)
    // }
}

function CortonaSetUp() {
    Cortona3DSolo.app.setDefaultBackgroundColors("#FFFFFF");
    Cortona3DSolo.app.setSelectionColor("#C9AD6D");
    Cortona3DSolo.app.setHoverColor("#EDDBB4");
    
    //SK 14/07/2022: Ignore transparent item
    Cortona3DSolo.app.pickerTransparencyThreshold = 0.2;
}

function PrintOutputSetUp() {
    window.setPrintHeader(Cortona3DSolo.app.ipc.interactivity)
}

// IPC hooks
Cortona3DSolo.expand(Cortona3DSolo.app.ipc, {
    // hooks
    didHoverItem: function (index) {
        var interactivity = Cortona3DSolo.app.ipc.interactivity,
            csn = interactivity.getItemByIndex(index);
        Cortona3DSolo.app.drawing.hoverHotspot(csn);
        Cortona3DSolo.app.ipc.dpl.hoverRow(index);
        Cortona3DSolo.app.drawing.hoverColor = "#518DAB";
        hoverIndex = index;
    },

    didSelectItem: function (index) {
        var interactivity = Cortona3DSolo.app.ipc.interactivity,
            csn = interactivity.getItemByIndex(index);
        // console.log("Selected Item : ")
        // console.log(index);
        setTimeout(function () {
            Cortona3DSolo.app.ipc.selectItem(index);
            //Select Row Alone
            Cortona3DSolo.app.ipc.dpl.selectRowAlone(index);
            // Cortona3DSolo.app.drawing.selectionColor = "#eddbb4";
            Cortona3DSolo.app.drawing.selectionColor = "#C9AD6D";
            // $('#dpl-table > tbody > .selected').show();
            clickAccordian(index);
            try {
                $("#row" + index).get(0).scrollIntoView();
            } catch (e) {
                console.log(e)
            }
        }, 50);
    },

    didSelectSheet: function (sheet) {
        m_viewHistory.push(sheet);
        m_select.value = sheet.id;
        m_sheet_drawing = sheet.drawing;
        m_sheet_desc = sheet.description;

        PartTable(sheet.dplTable);

        // Warning / Safety Remarks
        $('table#dpl-table tbody > tr').each(function (index, tr) {
            var interactivity = Cortona3DSolo.app.ipc.interactivity;
            var rowID = $(tr).attr('id');

            if (rowID) {
                var rowIndex = rowID.split("row")[1];
                var rowData = interactivity.getRowByIndex(rowIndex);
                var selectedPartInfo = interactivity.getItemInfo(rowData);
                var rowComponentData = selectedPartInfo.metadata["_8D45383FA4614D4EB539FDE4F05B3084"];
                if (rowComponentData == -1) {
                    $(this).addClass("warning");
                }
            }
        });

        // Indent part table - not implement yet
        $('table#dpl-table > tbody > tr').each(function (index, tr) {
            var lineNum = Cortona3DSolo.app.ipc.interactivity.getRowByIndex(index);
            var indent = Cortona3DSolo.app.ipc.interactivity.getItemInfo(lineNum).commands[0].values.Indent;
            $(this).attr('indent', indent)
        });

        hidePdfDrawing();
    },

    // BI 23Aug22: didChangeItemVisibility hook.
    didChangeItemVisibility: function (isHidden, rowNo) {
        if(isHidden) {
            window.dplRowHide = [rowNo, true]
        } else {
            window.dplRowHide = [rowNo, false]
        }
    },

    didIsolate: function (index) {
        // hide all
        var totalRow = Cortona3DSolo.app.ipc.currentSheetInfo.dplTableWidth
        for (let row = 0; row < totalRow; row++) {
            Cortona3DSolo.app.ipc.toggleItemVisibility(row)
        }

        // show current part only
        Cortona3DSolo.app.ipc.toggleItemVisibility(index)
        var rowinfo = Cortona3DSolo.app.ipc.interactivity.getItemInfo(index)
        console.table(rowinfo)
        if( window.dplRowHide[0].includes(Number(index)) && window.dplRowHide[1] ) {
            Cortona3DSolo.app.ipc.toggleItemVisibility(index)
        }
    },

    didDrawingDisplayMode: function(drawingMode){
        if(drawingMode){
            console.log('Drawing Mode: 2D')
            $('#ContextMenu-HideBtn').hide()
            $('#ContextMenu-IsolateBtn').hide()
        } else {
            console.log('Drawing Mode: 3D')
            $('#ContextMenu-HideBtn').show()
            $('#ContextMenu-IsolateBtn').show()
        }
    }
});

Cortona3DSolo.expand(Cortona3DSolo.app, {
    didFinishLoadDocument: function (doc) {
        displayType();
        ContentSetUp();
        CortonaSetUp();
        PrintOutputSetUp();
        window.setDetailTable(Cortona3DSolo.app.ipc.interactivity);
        window.setDisplayLoading(false);

        window.titleData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["TITLE"];
        window.sectionData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_6909F78148EC441F9C885A633128042F"];
        window.docNoData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["TOPIC_ID"];
        window.modelData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_AE0FF824ACAF49E99AC50C8404A2ED97"];
        window.modelYearData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_46CB3D37B61E40B4B945721C1399A139"];
        window.engineData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_9C20F281833A476A874133F435679CBF"];
        window.transmissionData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_012E5F47CFBB4D86B4AE50EF3A1B0706"];
        window.lhdRhdData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_54BC13BF6EE045CBB3C697D494EBA09B"];
        window.bodyData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_00CE3CA4F75C4DB3844BE583D75E6329"];
        window.regionData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_E1EE426BF10F481E875603842A1194F9"];
        window.revisionData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_F5CB2C8BA28A40C98560EFC3EB7A60DD"];
        window.revisionDateData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_5D663E0622A1472891FF6373AE63F50D"];
        window.createdDateData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_E1CD9B386FC44B109121BAC3D3F3D8F6"];
        window.vinToData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_9BF5891E2CA84E5E8A86D3FAD2C98399"];
        window.vinFromData = Cortona3DSolo.app.ipc.interactivity.getProjectMetadata()["_FDC4E19636904C22B22C3C5164282605"];

        // Change date
        if (window.docLanguage == "ar-SA") {
            window.revisionDateData = window.revisionDateData.substr(0, window.revisionDateData.indexOf('T')).replace("-", "/").replace("-", "/");
            window.createdDateData = window.createdDateData.substr(0, window.createdDateData.indexOf('T')).replace("-", "/").replace("-", "/");
        }

        if (doc.sheets.length) {
            m_select = document.createElement('select');
            m_select.setAttribute('id', "SheetMenu");
            m_select.setAttribute('class', "SelectMenu");
            doc.sheets.forEach(function (sheet, index) {
                var option = document.createElement('option');
                option.setAttribute('value', sheet.id);
                option.setAttribute('key', sheet.id);
                option.appendChild(document.createTextNode(sheet.description));
                m_select.appendChild(option);
            });
        }
    },

    firstFrameDidArrive: function () {
        document.body.classList.add('ready');

        // Selected Object on the canvas
        $("canvas").mousedown(function (e) {
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
            pickedObject = Cortona3DSolo.app.pickObject(mouseX, mouseY);
            // Get Clicked part Handle
            if (window.pickedObject && isRotationNeeded) {
                // Set Rotation Center
                Cortona3DSolo.app.setRotationCenterToObjects([window.pickedObject.handle]);
                Cortona3DSolo.app.setRotationCenterToSelectedObjects();
                console.log("Rotation Set")
                // Reset Rotation Needed
                isRotationNeeded = false;
            }
        });

        $(window).resize(function (e) {
            canvasResize();
        });

        // Change buttons position dynamically on scroll
        $("#MiniDrawerDiv").scroll(function () {
            var yTransparency = $("#TransparencyBtn").offset().top;
            var yMultiView = $("#MultiViewBtn").offset().top;
            var y3DView = $("#_3dViewBtn").offset().top;
            var yShow2D = $("#2DViewBtn").offset().top;

            $("#showTransparent").css({top: yTransparency});
            $("#showMulti").css({top: yMultiView});
            $("#show3D").css({top: y3DView});
            $("#show2D").css({top: yShow2D});
        });
    },

    didSetSelectedContext: function() {
        $('.ContextMenu > div > ul > li.Mui-selected').each(function (i, v) {
            $(this).removeClass('Mui-selected');
        });

        let current = window.Cortona3DSolo.app.ipc.getCurrentSheet().id
        $('.ContextMenu > div > ul > li.MuiListItem-root').each(function (i, v) {
            let view = window.$(this).attr('value');
            console.log("View: " +view)

            if(current == view){
                $(this).addClass('Mui-selected');
            }
        });
    }
});

// dpl
Cortona3DSolo.expand(Cortona3DSolo.app.ipc.dpl, {
    didSelectRow: function (index) {
        var csn = Cortona3DSolo.app.ipc.interactivity.getItemByIndex(index);
        Cortona3DSolo.app.ipc.selectItem(index);
        Cortona3DSolo.app.ipc.dpl.selectRowAlone(index);
        Cortona3DSolo.app.drawing.selectHotspotAlone(csn);
        // Cortona3DSolo.app.drawing.selectionColor = "#eddbb4";
        Cortona3DSolo.app.drawing.selectionColor = "#C9AD6D";
    },
    didHoverRow: function (index) {
        var csn = Cortona3DSolo.app.ipc.interactivity.getItemByIndex(index);
        Cortona3DSolo.app.ipc.hoverItem(index);
        Cortona3DSolo.app.drawing.hoverHotspot(csn);
        Cortona3DSolo.app.drawing.hoverColor = "#518DAB";
    },
    didSetupTable: function (tableElement) {
        var tableElementObj = $(tableElement);


        tableElementObj.children().each(function (i, v) {
            // if ($(v).prop("tagName").toLowerCase() == "colgroup") {
            // $(v).append("<col width='4%'/>");
            // $(v).children("col:eq(6)").remove();
            //     console.log("col")
            //     console.log(v)
            // }
            //        if ($(v).prop("tagName").toLowerCase() == "thead") {
            //            tableTheadChildRow.append("<td width='4%'><pre></pre></td>");
            //            console.log("thead")
            //            console.log(v)
            //        }
            // $(v).add().children("col:eq(6)").html().addClass('no-display');


            var tableTheadElementObj = $(v);
            var tableTheadChildRow = $(tableTheadElementObj.children());
            // tableTheadChildRow.append("<td width='4%'><pre></pre></td>");
            // tableTheadChildRow.children("td:eq(6)").remove();
        });

    },
    didSetupRow: function (rowElement, index) {
        var ixml = Cortona3DSolo.app.ipc.interactivity;
        // debugVar = rowElement;
        var str = '<td class="no-display"><input class="checkbox-cell" type="checkbox" id="chk' + (index) + '" data-index="' + index + '" checked/></td>';
        var strBtn = (window.docLanguage === "ar-SA") ?
            '<div class="triangleBtnLeft" id="btn' + (index) + '" data-index="' + index + '"/>' : ' <div class="triangleBtnRight" id="btn' + (index) + '" data-index="' + index + '"/>';
        // $(rowElement).children("td:eq(0)").html(strBtn); Dropdown for table row (triangle button)
        $(rowElement).append($(str));


        var clickCount = 0;
        $('#btn' + (index)).parent().click(function () {
            if (window.lastElemClicked !== 'btn'.concat(index)) {
                clickCount = 0;
            }
            clickCount++;
            console.log('last item:' + window.lastElemClicked);
            console.log('current item:' + 'btn'.concat(index));

            var currentSelectedRowIndex = parseInt($(this).children('#btn' + (index)).attr("data-index"));


            if (clickCount % 2 == 0) {
                console.log("enter even");
                $('.tr' + index).hide();
                $('#btn' + index).removeClass("transformTriangle transformTriangleInverse");
            } else {
                console.log("enter odd");
                lastClickEl('btn'.concat(index));
                // $('.row-open').hide();
                $('.row-open').remove();
                $('.triangleBtnRight').removeClass("transformTriangle");
                $('.triangleBtnLeft').removeClass("transformTriangleInverse");

                var minQty = $('#row' + index).children("td:eq(4)").text();
                var interchangeValue = $('#row' + index).children("td:eq(6)").text();

                if (interchangeValue) {
                    var content = $('<tr class="tr' + index + ' row-open"><td colspan="2" class="td-accordian hiddenColumn"></td>' +
                        '<td class="td-accordian td-none"><div class="content">' + window.orderQtyLabel + '</div></td><td class="td-accordian td-none">' +
                        '<input class="inputNumber" type="number" min="0" value="' + minQty + '" name="orderQty" id="orderQty_' + index + '"></td>' +
                        '<td colspan="2" class="td-accordian hiddenColumn"></td></tr>' +
                        '<tr class="tr' + index + ' row-open"><td colspan="2" class=" td-accordian hiddenColumn"></td>' +
                        '<td class="td-accordian td-none"><div class="content">' + window.InterchangeableLabel + '</div></td>' +
                        '<td class="interchangeData" id="interchangeable_' + index + '">' + interchangeValue + '</td>' +
                        '<td colspan="2" class=" td-accordian hiddenColumn"></td></tr>' +
                        '<tr class="tr' + index + ' row-open"><td colspan="3" class="td-accordian hiddenColumn"></td>' +
                        '<td class="addCartBtn" id="tdCart_' + index + '"><b><button class="addCartBtn" id="addCart_' + index + '" data-index="' + index + '">' + window.addOrderLabel + '</button></b></td>' +
                        '<td class="hiddenColumn td-accordian exclamationMark"><span id="mark_' + index + '"></span></td><td class="td-accordian hiddenColumn"></td></tr>' +
                        '<tr class="tr' + index + ' row-open"><td colspan="100%" class="td-accordian lastRow"></td></tr>');
                } else {
                    var content = $('<tr class="tr' + index + ' row-open"><td colspan="2" class="td-accordian hiddenColumn"></td>' +
                        '<td class="td-accordian td-none"><div class="content">' + window.orderQtyLabel + '</div></td><td class="td-accordian td-none">' +
                        '<input class="inputNumber" type="number" min="0" value="' + minQty + '" name="orderQty" id="orderQty_' + index + '"></td>' +
                        '<td colspan="2" class="td-accordian hiddenColumn"></td></tr>' +
                        '<tr class="tr' + index + ' row-open"><td colspan="3" class="td-accordian hiddenColumn"></td>' +
                        '<td class="addCartBtn" id="tdCart_' + index + '"><b><button class="addCartBtn" id="addCart_' + index + '" data-index="' + index + '">' + window.addOrderLabel + '</button></b></td>' +
                        '<td class="hiddenColumn td-accordian exclamationMark"><span id="mark_' + index + '"></span></td><td class="td-accordian hiddenColumn"></td></tr>' +
                        '<tr class="tr' + index + ' row-open"><td colspan="100%" class="td-accordian lastRow"></td></tr>');
                }

                $('tr[data-index=' + currentSelectedRowIndex + ']').after(content);
                $('.content').show();
                window.docLanguage === "ar-SA" ? $('#btn' + index).addClass("transformTriangleInverse") : $('#btn' + index).addClass("transformTriangle");


                if (parseInt($("#orderQty_" + index).val()) > parseInt($("#stock_" + index).text())) {
                    // $("#orderQty_" + index).addClass("errorClass");
                    // $('#addCart_' + index).prop( "disabled", true);
                    // $("#addCart_" + index).addClass("disabledClass");
                    // $("#tdCart_" + index).addClass("disabledClass");
                    // $("#mark_" + index).text("!");
                }

                if ($('#stock_' + index).text() == 0) {
                    // $('#orderQty_' + index).prop( "disabled", true);
                    // $('#orderQty_' + index).val("0");
                    // $('#addCart_' + index).prop( "disabled", true);
                    // $('#addCart_' + index).addClass('disabledClass');
                    // $('#tdCart_' + index).addClass('disabledClass');
                    // $("#mark_" + index).text("!");
                } else {
                    // $('#orderQty_' + index).prop( "disabled", false);
                    // $('#addCart_' + index).prop( "disabled", false);
                    // $('#addCart_' + index).removeClass('disabledClass');
                    // $('#tdCart_' + index).removeClass('disabledClass');
                    // $("#mark_" + index).text("");
                }

                $("#orderQty_" + (index)).change(function () {
                    if (parseInt(this.value) > $('#stock_' + index).text()) {
                        // $(this).addClass('errorClass');
                        // $("#mark_" + index).text("!");
                        // $('#addCart_' + index).prop( "disabled", true);
                        // $('#addCart_' + index).addClass('disabledClass');
                        // $('#tdCart_' + index).addClass('disabledClass');
                    } else {
                        // $(this).removeClass('errorClass');
                        // $("#mark_" + index).text("");
                        // $('#addCart_' + index).prop( "disabled", false);
                        // $('#addCart_' + index).removeClass('disabledClass');
                        // $('#tdCart_' + index).removeClass('disabledClass');
                    }
                })

                $('#addCart_' + (index)).click(function () {
                    var currentSelectedRowIndex = parseInt($(this).attr("data-index"));
                    addToRFQ(ixml, currentSelectedRowIndex);//Defined in HTML page
                    $(this).addClass("ordered");
                })

            }

            function lastClickEl(id) {
                window.lastElemClicked = id;
            }
        });
    },
    didCallContextMenu: function (index, offsetX, offsetY, target) {
        var sheets = Cortona3DSolo.app.modelInfo.sheets
        var selectedSheet = window.Cortona3DSolo.app.ipc.getCurrentSheet()
        var obj = Cortona3DSolo.app.ipc.interactivity.getItemByIndex(index);
        if (obj) {
            for (const sheet in sheets) {
                if (Object.hasOwnProperty.call(sheets, sheet)) {
                    const element = sheets[sheet];
                    $( "div.ContextMenuTable ul" ).ready(function() {
                        var h5 = document.createElement('h5');
                        h5.innerText = element.description;
                        h5.setAttribute('value', element.id);
    
                        if(element.id==selectedSheet.id) {
                            h5.setAttribute('class', "ContextMenuItem-view Mui-selected");
                        } else {
                            h5.setAttribute('class', "ContextMenuItem-view");
                            h5.setAttribute('onclick', "scriptSheetChange('" +element.id+ "')");
                        }
                        window.$("div.ContextMenuTable ul").append(h5);
                    });

                }
            }

            window.setContextMenuTable(offsetX, offsetY, obj, index);
        } else {
            Cortona3DSolo.app.restoreObjectProperty(0, Cortona3DSolo.app.PROPERTY_TRANSPARENCY, true);
        }
    },
    // expando
    selectRowAlone: function (index) {
        window.$('#dpl-table > tbody > tr').removeClass('selected')
        window.$('#dpl-table > tbody').find('tr#row' + index).addClass('selected')
    }
});

// Drawing
Cortona3DSolo.expand(Cortona3DSolo.app.drawing, {
    // expando
    selectHotspotAlone: function (name) {
        // Cortona3DSolo.app.drawing.selectionColor = "#eddbb4";
        Cortona3DSolo.app.drawing.selectionColor = "#C9AD6D";
        if (this.selectedHotspot) {
            Cortona3DSolo.app.drawing.selectHotspot(this.selectedHotspot, "");
        }
        this.selectedHotspot = name;
        if (name) {
            Cortona3DSolo.app.drawing.selectHotspot(name);
        }
    },

    // hooks
    didHoverHotspot: function (name, hover) {
        var index = hover ? Cortona3DSolo.app.ipc.interactivity.getIndexByItem(name) : -1;
        Cortona3DSolo.app.ipc.hoverItem(index);
        Cortona3DSolo.app.ipc.dpl.hoverRow(index);
        // Cortona3DSolo.app.drawing.hoverColor = "#99bcce";
        Cortona3DSolo.app.drawing.hoverColor = "#518DAB";
    },

    didSelectHotspot: function (name) {
        m_didSelectHotspotInvoked = true;
        var index = Cortona3DSolo.app.ipc.interactivity.getIndexByItem(name);
        Cortona3DSolo.app.ipc.selectItem(index);
        //Select Row Alone
        Cortona3DSolo.app.ipc.dpl.selectRowAlone(index);
        // Select Hotspot Alone
        Cortona3DSolo.app.drawing.selectHotspotAlone(name);
        // Cortona3DSolo.app.drawing.selectionColor = "#eddbb4";
        Cortona3DSolo.app.drawing.selectionColor = "#C9AD6D";
        clickAccordian(index);

    },

    willStartLoadDrawing: function (url) {
        if(url) {
            console.log('willStartLoadDrawing[2D]: ' +url)
            window.setDisableToggleImage(false)
        } else {
            console.log('willStartLoadDrawing[2D]: not exist')
            window.setDisableToggleImage(true)
        }
    },

    didFailLoadDrawing: function (url, status) {
        if(url) {
            console.log('didFailLoadDrawing[2D]: ' +url)
            window.setDisableToggleImage(false)
        } else {
            // Don't have 2D image
        console.log('didFailLoadDrawing: not exist')
            window.setDisableToggleImage(true)
        }
    },
});

function scriptSheetChange(sheetID) {
    Cortona3DSolo.app.ipc.setCurrentSheet(sheetID, true);
    window.setCloseMenuView()
    window.setCloseContextMenuTable()
};


function setTransparencySlider(objectID, objectName) {
    return Cortona3DSolo.app.getObjectsTransparency(objectID);
}

function canvasResize() {
    var width = $("canvas").innerWidth();
    var height = $("canvas").innerHeight();
    Cortona3DSolo.app.resize(width, height);
}

function addToRFQ(ixml, row) {
    var originalRowIndex = ixml.getRowByIndex(row);
    var selectedPartInfo = ixml.getItemInfo(originalRowIndex);
    //console.log(selectedPartInfo);
    // console.log(row)
    var quantity = $('#orderQty_' + row.toString()).val();
    // var price = $('#price_' + row).text();
    // console.log(price)
    var listOfItems = new Array();
    listOfItems.push({
        "description": selectedPartInfo.part.metadata["DFP"],
        "jobNumber": selectedPartInfo.metadata["ITEM"],
        "part": selectedPartInfo.part.metadata["PNR"],
        "partDescription": selectedPartInfo.part.metadata["DFP"],
        "qty": selectedPartInfo.part.metadata["QNA"],
        "quantity": parseInt(quantity),
        "serialNumber": "",
        // "price": parseInt(price),
        "remarks": "Default Remarks"
    });
    // console.table(listOfItems);


    

    /*BI 7Sept22: AddPart API*/
    /*BI 7Sept22: sent part no and quantity to portal/sap*/
    // try {
    //     // window.addProductWindow(listOfItems[0])
    //     var accessToken = window.sessionStorage.getItem("access_token");

    //     if ($('#SignIn').length == 0) {
    //         if (accessToken) {
    //             addPartAPI(selectedPartInfo.part.metadata["PNR"], parseInt(quantity), accessToken)
    //         } else {
    //             window.alert('Please click token button')
    //         }
    //     } else {
    //         window.alert('Please sign in first')
    //     }
    // } catch (e) {
    //     console.log(e.message);
    // }
}

/*BI 7Sept22: sent part no and quantity to portal/sap*/
function addPartAPI(partNo, qty, accessToken) {
    var userID = window.sessionStorage.getItem("userID");
    // const AddPartEndpoint = "https://apim-ial-dev-int.azure-api.net/api/v1.0/sap/opu/odata/ENCPP/DP_PART_SRV/AddPart";
    const AddPartEndpoint = "https://sap-dev.ineosautomotive.com/sap/opu/odata/ENCPP/DP_PART_SRV/AddPart";
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'Subscription-Key': '106ebd883ad245ae87a57eb52f050180',
        }
    };

    fetch(AddPartEndpoint
        + "?PartId='" + partNo + "'"
        + "&Qty='" + qty + "'"
        + "&UserId='" + userID + "'", requestOptions)
        .then((response) => {
            window.alert('[' + response.status + '-' + response.statusText + '] ' + partNo + ' ' + qty);
        })
        .catch((error) => {
            window.alert('[CORS?] ' + error);
        });
}


// Check if there is 2d image in current view
function hasDrawing() {
    var currentSheetId = Cortona3DSolo.app.ipc.getCurrentSheet().id;
    var ipcSvg = Cortona3DSolo.app.ipc.interactivity.getDrawingForIPCView(currentSheetId);

    if(ipcSvg != ""){
        return true
    } else {
        return false
    }
}

// Hide 2d image section in pdf when there is no 2d
function hidePdfDrawing() {
    var ipcSvg = hasDrawing();
    if (!ipcSvg) {
        $(".image2D").hide();
    } else {
        $(".image2D").show();
    }
}


function clickAccordian(index) {
    try {
        $('.tr' + index).hide();
        var btnId = 'btn'.concat(index);
        $('#' + btnId).click();
    } catch (e) {
        console.log(e)
    }
}


// function hideAllItems(index) {
//     try {
//         Cortona3DSolo.app.ipc.toggleItemVisibility(index);
//     } catch (e) {
//         console.log(e)
//     }
// }




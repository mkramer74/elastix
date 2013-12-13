var frmvalidator = null;
$( document ).ready(function() {
    $(this).on('click',"#elx_show_filter",function() {
        if ( $("#elx_filter_row").hasClass("oculto") ) {
            $("#elx_filter_row").slideDown();
            $("#elx_filter_row").removeClass("oculto").addClass("visible");
        }else{
            $("#elx_filter_row").slideUp();
            $("#elx_filter_row").removeClass("visible").addClass("oculto");
        }
    });
    
    $(this).on('click',"#elx_upload_file",function() {
        if ( $("#elx_row_upload_file").hasClass("oculto") ) {
            $("#elx_row_upload_file").slideDown();
            $("#elx_row_upload_file").removeClass("oculto").addClass("visible");
        }else{
            $("#elx_row_upload_file").slideUp();
            $("#elx_row_upload_file").removeClass("visible").addClass("oculto");
        }
    });
    
    uploadFile();
});

function formContact(){
    
    /* jquery ui, muestra los option buttons con el nuevo estilo*/
    $( ".contact_type" ).buttonset();
    
    /*  js para subir image*/
    $('.fileUpload').liteUploader(
    {
        script: '?menu=contacts&action=uploadImageContact&rawmode=yes',
        allowedFileTypes: 'image/jpeg,image/png,image/gif',
        maxSizeInBytes: 250000,
        customParams: {
            'custom': 'tester'
        },
        before: function (files)
        {
           // $('#details, #previews').empty();
            $('#msg-text').html('Uploading ' + files.length + ' file(s)...');
        },
        each: function (file, errors)
        {
            var i, errorsDisp = '';

            if (errors.length > 0)
            {
                $("#message_area").slideDown();
                $("#msg-text").removeClass("alert-success").addClass("alert-danger");
                $('#msg-text').html('Error uploading your file');

                $.each(errors, function(i, error)
                {
                    errorsDisp += '<br /><span class="error">' + error.type + ' error - Rule: ' + error.rule + '</span>';
                });
            }

            //$('#details').append('<p>name: ' + file.name + ', type: ' + file.type + ', size:' + file.size + errorsDisp + '</p>');
        },
        success: function (response)
        {
            var response = $.parseJSON(response);
            if(response.error !== ''){
                alert(response.error);
            }else{
                //alert(response.message);
                //guardo en un hidden
                $('input[name=image]').val(response.message);
            }
           //console.debug(response);
           /* alert(response.error)
            $.each(response.urls, function(i, url)
            {
                $('#previews').append($('<img>', {'src': url, 'width': 200}));
            });

            $('#msg-text').html(response.message);*/
        }
    });
}

function saveNewContact(){
    showElastixUFStatusBar("Saving...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="saveNew";
    arrAction["contact_type"]=$("input[name='contact_type']:checked").val();
    arrAction["first_name"]=$("input[name='first_name']").val();
    arrAction["last_name"]=$("input[name='last_name']").val();
    arrAction["work_phone_number"]=$("input[name='work_phone_number']").val();
    arrAction["cell_phone_number"]=$("input[name='cell_phone_number']").val();
    arrAction["home_phone_number"]=$("input[name='cell_phone_number']").val();
    arrAction["fax_number_1"]=$("input[name='fax_number_1']").val();
    arrAction["fax_number_2"]=$("input[name='fax_number_2']").val();
    arrAction["email"]=$("input[name='email']").val();
    arrAction["province"]=$("input[name='province']").val();
    arrAction["city"]=$("input[name='city']").val();
    arrAction["address"]=$("input[name='address']").val();
    arrAction["company"]=$("input[name='company']").val();
    arrAction["contact_person"]=$("input[name='contact_person']").val();
    arrAction["contact_person_position"]=$("input[name='contact_person_position']").val();
    arrAction["notes"]=$("textarea[name='notes']").val();
    arrAction["picture"] = $('input[name=image]').val();

    arrAction["rawmode"]="yes";
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if (error != '' ){
                showElxUFMsgBar('error',error['stringError']);
                // se recorre todos los elementos erroneos y se agrega la clase error (color rojo)
                $(".flag").removeClass("has-error");
                $(".visible-tooltip").removeClass("visible-tooltip").addClass("hidden-tooltip");
                for(var i=0;i<error['field'].length; i++){     
                    $("[name='"+error['field'][i]+"']").parents(':first').addClass("has-error flag");
                    $("[name='"+error['field'][i]+"']").next().tooltip().removeClass("hidden-tooltip").addClass("visible-tooltip");
                }
            }else{
                $("#module_content_framework_data").html(arrData);
                $(".visible-tooltip").removeClass("visible-tooltip").addClass("hidden-tooltip");
                showElxUFMsgBar('success',"Changes were saved succefully");
            }
    });
}

function saveEditContact(){
    showElastixUFStatusBar("Saving...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="saveEdit";
    arrAction["contact_type"]=$("input[name='contact_type']:checked").val();
    arrAction["first_name"]=$("input[name='first_name']").val();
    arrAction["last_name"]=$("input[name='last_name']").val();
    arrAction["work_phone_number"]=$("input[name='work_phone_number']").val();
    arrAction["cell_phone_number"]=$("input[name='cell_phone_number']").val();
    arrAction["home_phone_number"]=$("input[name='cell_phone_number']").val();
    arrAction["fax_number_1"]=$("input[name='fax_number_1']").val();
    arrAction["fax_number_2"]=$("input[name='fax_number_2']").val();
    arrAction["email"]=$("input[name='email']").val();
    arrAction["province"]=$("input[name='province']").val();
    arrAction["city"]=$("input[name='city']").val();
    arrAction["address"]=$("input[name='address']").val();
    arrAction["company"]=$("input[name='company']").val();
    arrAction["contact_person"]=$("input[name='contact_person']").val();
    arrAction["contact_person_position"]=$("input[name='contact_person_position']").val();
    arrAction["notes"]=$("textarea[name='notes']").val();
    arrAction["picture"] = $('input[name=image]').val();

    arrAction["rawmode"]="yes";
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if (error != '' ){
                showElxUFMsgBar('error',error['stringError']);
                // se recorre todos los elementos erroneos y se agrega la clase error (color rojo)
                $(".flag").removeClass("has-error");
                $(".visible-tooltip").removeClass("visible-tooltip").addClass("hidden-tooltip");
                for(var i=0;i<error['field'].length; i++){     
                    $("[name='"+error['field'][i]+"']").parents(':first').addClass("has-error flag");
                    $("[name='"+error['field'][i]+"']").next().tooltip().removeClass("hidden-tooltip").addClass("visible-tooltip");
                }
            }else{
                $("#module_content_framework_data").html(arrData);
                $(".visible-tooltip").removeClass("visible-tooltip").addClass("hidden-tooltip");
                showElxUFMsgBar('success',"Changes were saved succefully");
            }
    });
}

function elxGridSearch(numPage){
    var arrFilter=new Array();
    arrFilter["ftype_contacto"]=$("select[name='ftype_contacto'] option:selected").val();
    arrFilter["filter"]=$("select[name='filter'] option:selected").val();
    arrFilter["filter_value"]=$("input[name='filter_value']").val();
    elxGridData('contacts','search', arrFilter, numPage);
}

function newContact(){
    showElastixUFStatusBar("Loading...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="newContact";
    arrAction["rawmode"]="yes";
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if(error != ''){
                alert(error);
            }else{
                $("#module_content_framework_data").html(arrData);
                formContact();
            }
        }
    );       
}

function editContact(idContact){
    showElastixUFStatusBar("Loading...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="editContact";
    arrAction["rawmode"]="yes";
    arrAction["idContact"]=idContact;
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if(error != ''){
                alert(error);
            }else{
                $("#module_content_framework_data").html(arrData);
                formContact();
            }
        }
    );       
}

function cancelContact(){
    showElastixUFStatusBar("Loading...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="cancel";
    arrAction["rawmode"]="yes";
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if(error != ''){
                alert(error);
            }else{
                $("#module_content_framework_data").html(arrData);
            }
        }
    );       
}

function downloadCSV(){
    showElastixUFStatusBar("Loading...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="downloadCSV";
    arrAction["rawmode"]="yes";
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if(error != ''){
                alert(error);
            }else{
                
            }
        }
    );       
}

function deleteContacts(msg){
    if(!confirmSubmit(msg))
        return false;
    
    showElastixUFStatusBar("Deleting...");
    var arrAction = new Array();
    arrAction["menu"]="contacts";
    arrAction["action"]="deleteContacts";
    arrAction["rawmode"]="yes";
    var listUIDs="";
    $("input[name=checkContacts]:checked").each(function(){
        listUIDs +=$(this).attr('id')+",";
    });
    arrAction["contactChecked"]= listUIDs;
    
    request("index.php", arrAction, false,
        function(arrData,statusResponse,error){
            hideElastixUFStatusBar();
            if(error != ''){
                showElxUFMsgBar('error',error);
            }else{
                $("#module_content_framework_data").html(arrData);
                showElxUFMsgBar('success',"Changes were saved succefully");
            }
        }
    );       
}

function uploadFile(){
    
    $('#elx_uploadFile').liteUploader(
    {
        script: '?menu=contacts&action=uploadCSV&rawmode=yes',
        allowedFileTypes: null,
        maxSizeInBytes: null,
        customParams: {
            'custom': 'fileCSV'
        },
        success: function (response)
        {
            //var response = $.parseJSON(response);
            if(response.error !== ''){
                showElxUFMsgBar('error',response.error);
            }else{
                showElxUFMsgBar('success',"Contacts were saved succefully");
            }
        }
    });
}

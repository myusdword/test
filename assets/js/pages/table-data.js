$(document).ready(function() {
    
    "use strict";
    
    
    // Datatables
    
    $('#example').dataTable();
    
    var table = $('#example2').DataTable({
        "columnDefs": [
            { "visible": false, "targets": 2 }
        ],
        "order": [[ 2, 'asc' ]],
        "displayLength": 25,
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(2, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="5">'+group+'</td></tr>'
                    );
 
                    last = group;
                }
            } );
        }
    } );
 
    // Order by the grouping
    $('#example2 tbody').on( 'click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if ( currentOrder[0] === 2 && currentOrder[1] === 'asc' ) {
            table.order( [ 2, 'desc' ] ).draw();
        }
        else {
            table.order( [ 2, 'asc' ] ).draw();
        }
    } );
    
    $.fn.isValid = function(){
        return this[0].checkValidity()
    }
    
    var t = $('#example3').DataTable();
 
    $('#add-row').on( 'click', function () {
        if($("#add-row-form").isValid()) {
            var name = $('#name-input').val(),
                position = $('#position-input').val(),
                age = $('#age-input').val(),
                date = $('#date-input').val(),
                salary = $('#salary-input').val();

            var  tdate=subta(name,position,age,date);

            

            console.log(tdate);
            var show=new Array()
            console.log(t);
            t.clear();
            for (let index = 0; index < tdate.length; index++) {
               var gsub=blfxs(tdate[index].gsub);
               var  ssub=blfxs(tdate[index].ssub);
               var prsub=blfxs(tdate[index].prsub);
               var  timsub=tdate[index].timsub;
               var gtsub=blfxs(tdate[index].gtsub);
                
                t.row.add( [
                    gsub,
                    ssub,
                    prsub,
                    timsub,
                    gtsub
                ] ).draw();



            }
            
            
            $('.modal').modal('hide');
            
            return false;
        }
    });
    //????????????
    //????????????
    //????????????
    //????????????
    function subta(subf,ftime,stime,prt){
        var   ret={
            gsub:1, //??????????????????
            prsub:1, //??????????????????
            ssub:1, //??????????????????
            gtsub:1 ,//??????????????????
            timsub:1 //??????
        }

        var mycars=new Array()
        var allsf=0;
        for (let index = 0; index < ftime; index++) {
            var ds = new Object();
            ds.timsub=index+1;
            ds.gsub=subf*(index+1);  // ???????????????
            var nowprsub=subf*prt;   //????????????????????????
            var nowrelease=nowprsub/stime; //??????????????????
            ds.ssub=nowrelease*(index+1);  //?????????????????????
           
            var allprsub=0;
            if(index>=stime){
                ds.ssub=nowrelease*stime;   //?????????????????? ?????????????????????
                 allprsub=nowprsub*stime
            }else{
                 allprsub=nowprsub*(index+1);
            }
            allsf+=ds.ssub;
            ds.prsub=(ds.gsub*prt)-allsf;
            ds.gtsub=subf-nowprsub+ds.ssub;
           
            mycars.push(ds);
            
        }
        return mycars;


    }


    function blfxs(number){
       
        number = String(number).replace(/^(.*\..{5}).*$/,"$1");
        number = Number(number); // number = 12.3321
        return number;
    }





    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true
    });
});
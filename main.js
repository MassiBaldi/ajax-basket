// Grazie all’utilizzo dell’API e il suo URL https://www.boolean.careers/api/ar ray/basket?n=numberPlayers Ricreare l’esercizio del basket, questa volta dando la possibilità all’utente di scegliere quanti giocatori generare per poi stampare la lista in una sidebar e vedere le statistiche correlate al player clicccato

var sceltaUtente = parseInt(prompt('Scegli un numero da 1 a 100 per quanti giocatori vuoi?'));
$.ajax({
  url:'https://www.boolean.careers/api/array/basket?n=numberPlayers',
  data: {
    n: sceltaUtente
  },
  method: 'GET',
  success: function(data){
    var ajax = data.response;
    console.log(ajax);
    for (var i = 0; i < ajax.length; i++) {

      var casella = $('.template .casellaCodice').clone();

      console.log(casella);

      var codiceGiocatore = ajax[i].playerCode;

      console.log(codiceGiocatore);

      casella.text(codiceGiocatore);

      $('.sidebar').append(casella);
    }

    $('.casellaCodice').click(function(){
      var thisCode = $(this).text();
      for (var i = 0; i < ajax.length; i++) {
        var codiceGiocatore = ajax[i].playerCode;
        if (thisCode == codiceGiocatore) {
          console.log(ajax[i]);
          var source = $('#datiGiocatore').html();
          var template = Handlebars.compile(source);
          var context = {codice : ajax[i].playerCode, rimbalzi : ajax[i].rebounds, punti : ajax[i].points, falli : ajax[i].fouls, percentuale2punti : ajax[i].twoPoints, percentuale3punti : ajax[i].threePoints};
          var html = template(context);
          $('.mainGiocatore').html(html);
        }
      }

    });
  },
  error: function(){

  }

});

// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* Escena 1 */
undum.game.situations = {
    inicio: new undum.SimpleSituation(
        "<h1>Hora de comer</h1>\
        <img src='media/games/tutorial/tenedor.png' class='float_right'>\
        <p>Son las dos de la tarde, una hora menos en Canarias. Est\u00E1s <a href='./potencia-cansancio'>exhausto</a>\
        tras una maratoniana jornada de trabajo implementando la pr\u00E1ctica 2 de\
        Desarrollo \u00C1gil.</p>\
        \
        <p>Vas a la cocina y decides demostrar tus dotes de chef realizando\
        unos macarrones con tomate.</p>\
        \
        <p>Tras cocer los macarrones y echarlos en la sart\u00E9n. \u00A1Sorpresa! \
        no hay <a href='hub'>tomate frito.</p>",
        {
            actions: {
                "luck-boost": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck+1);
                },
                "luck-reduce": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck-1);
                },
                "potencia-cansancio": function(character, system, action) {
                    system.setQuality("cansancio", character.qualities.cansancio+1);
                }
            },
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:00 PM</p>"
                );
     
                 system.setQuality("hambre", character.qualities.hambre+1);
   
            }
            
        }
    ),
    /* Decisiones Escena 1 */
    otracosa: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["topic"],
        optionText: "Comer otra cosa",
        displayOrder: 1,
        exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:05 PM</p>"
                );
                 system.setQuality("cansancio", character.qualities.cansancio+3);
                 system.setQuality("hambre", character.qualities.hambre+1);
   
            }
    }),

    sintomate: new undum.SimpleSituation(
        "<p>Aunque tienes tanta hambre que te comer\u00EDas un Mamut, misteriosamente te apetece m\u00E1s <a href='comprar'>ir de compras</a>. Adem\u00E1s\
        te puede ser \u00FAtil el paseo para despejar la mente y seguir trabajando la pr\u00E1ctica de Desarrollo \u00C0gil esta tarde. </p>\
        \
        <p class='transient'>\
        \
        </p>",
        {
            heading: "Macarrones sin tomate",
            diplayOrder: 2,
            tags: ["topic"],
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:05 PM</p>"
                );
                 system.setQuality("hambre", character.qualities.hambre+2);

   
            }
        }

    ),
    ketchup: new undum.SimpleSituation(
        "<p>Aunque aparenta ser un atentado contra la salud p\u00FAblica\
        parece una buena soluci\u00F3n. Sin embargo recuerdas que casualmente\
        no te gusta el ketchup. Algo por dentro de dice que deber\u00EDas \
        <a href='hub'>tomar una mejor decisi\u00F3n.</a>\</p>"
        ,
        {
            heading: "Macarrones con ketchup",
            tags: ["topic"],
            displayOrder: 4,
            actions: {
                "cansancio-boost": function(character, system, action) {
                    system.setQuality("cansancio", character.qualities.cansancio+1);
                }
                
            },
            exit: function(character, system, to) {
                system.setQuality("hambre", character.qualities.hambre+3);
                system.setCharacterText(
                    "<p>14:05 PM</p>"
                );
            }
        }
    ),
    comprar: new undum.SimpleSituation(
        "<p>Parece una buena decisi\u00F3n ir al supermecado.\
        </p>\
        \
        <img src='media/games/tutorial/casa.png' class='float_left'>\
        <p>Cuando est\u00E1s a punto de cerrar la puerta y salir te das\
        de que te has dejado la cartera dentro.\
        <p>\
        \
        <p>Vuelves a subir y tras 5 minutos busc\u00E1ndola la encuentras\
        dentro de la mochila. <a href='./olvidar'>Te dejas</a> o <a href='./noolvidar'> no te dejas</a> las llaves en casa. Finalmente por fin sales de casa\
        y te <a href='calle'>dirijes hacia el supermercado</a>.</p>",
        {
            tags: ["topic"],
            displayOrder: 3,
            heading: "Salir de compras",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:10 PM</p>"
                );
                 system.setQuality("cansancio", character.qualities.cansancio+2);
                 system.setQuality("hambre", character.qualities.hambre+1);
   
            },
            actions: {
                "olvidar": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck-1);
                    
                },
                "noolvidar": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck+1);
                }
            },
        }
    ),
    
    /* Escena 2 */
    calle: new undum.SimpleSituation(
        "<p></p>\
        \
        <p>Parec\u00EDa que iba a ser un d\u00EDa tranquilo, un d\u00EDa normal. \
        <img src='media/games/tutorial/calle2.png' class='float_right'> Apenas\
        te encuentras a nadie en la calle, algo raro para ser la hora punta en\
        la que la gente sale del trabajo o del colegio.<\p>\
        <p>Tras 5 minutos andando por la escarpada calle que separa tu casa del\
        Polideportivo Municipal.<\p>\
        <p>De repente\
        el cielo de la ciudad de \u00DAbeda se torna oscuro y\
        una luz verde cae s\u00FAbitamente sobre tus hombros.\
        <p><a href='ovni'>Decides girarte para ver que pasa.</a></p>",
        {
            heading: "Fuera de casa",
            tags: ["topicw"],
            displayOrder: 4,
            actions: {
                "cansancio-boost": function(character, system, action) {
                    system.setQuality("cansancio", character.qualities.cansancio+1);
                }
            },
            exit: function(character, system, to) {
                system.setQuality("hambre", character.qualities.hambre+3);
                system.setQuality("cansancio", character.qualities.cansancio+5);
                system.setCharacterText(
                    "<p>14:20 PM</p>"
                );
            }
            
        }
    ),
    "ovni": new undum.SimpleSituation(
   
        "<p>\
        \u00A1No te lo puedes creeer!\
        \
        Un extra\u00F1o objeto no identificado con forma de platillo, ovni para los amigos,\
        se alza sobre tus ojos. <img src='media/games/tutorial/ovni2.png' class='float_left'></p>\
        <p>\u00BFC\u00F3mo puede haber una invasi\u00F3n extraterreste en la\
        provincia de Ja\u00E9n? En las pel\u00EDculas esto solo pasa en Estados Unidos.</p>\
        <p>Ante este tipo de situaci\u00f3n, si bien es cierto que no es nada com\u00FAn, cada persona actua \
        de una manera diferente. </p>\
      \
        <p>Hay gente que se <a href='parado'>queda parada por p\u00E1nico</a>, otra sin embargo \
        <a href='correr'>sale corriendo</a> o <a href='esconderse'>trata de esconderse</a>.\
        \
        <p>",
        {
        heading: "Al girarte",
            actions: {
                "luck-boost": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck+1);
                },
                "luck-reduce": function(character, system, action) {
                    system.setQuality("luck", character.qualities.luck-1);
                }
            },
            exit: function(character, system, to) {
                system.setQuality("cansancio", character.qualities.cansancio+1);
                system.setCharacterText(
                    "<p>14:22 PM</p>"
                );
            }
            
        }
    ),
    /* Decisiones Escena 2 */
    "parado": new undum.SimpleSituation(
        "\
        <p>Aunque no es de las mejores decisiones que tomar cuando te encuentras\
        un ovni por la calle, permaneces inmutable mirandolo fijamente.</p> <p>Quieres moverte\
        pero no puedes. El miedo te hace sentir todo lo que te rodea, hasta la cartera en tu bolsillo derecho.</p>\
        <p>Finalmente ocurre lo peor, eres abducido. Comienza la luz verde a elevarte,\
        aunque le cuesta m\u00E1s de lo normal porque est\u00E1s pasado de peso.\
        <img src='media/games/tutorial/ovni.png' class='float_left'></p>\
        <p>Una vez dentro del ovni. Apareces dentro de una especie de jaula. <img src='media/games/tutorial/prision.png' class='float_right'>El miedo inunda tu ser\
        <p>Se abre una puerta como en las pel\u00EDculas de la que sale una neblina que poco a poco va aumentando\
        \de tama\u00F1o.</p><p> Aparece la silueta de un humano, qu\u00E9 raro pensabas que los aliens eran m\u00E1s peque\u00F1os.\
        <img src='media/games/tutorial/silueta.png' class='float_left'></p>\
        \<p>-\u00BFHola, eres Gurb? -dijo el extraterreste.</p>\
        <p>-No, no lo soy -le respondes.</p>\
        <p>Se te acerca y para tu sorpresa tiene la apariencia de:  <a href='ronaldo'>Cristiano Ronaldo</a>,\
        <a href='victor'>\ntu profesor de Desarrollo \u00C1gil</a> o <a href='mendoza'>Eduardo Mendoza</a>.</p>",
        {
            heading: "Te quedas parado",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:40 PM</p>"
                );
                system.setQuality("hambre", character.qualities.hambre+1);


            }
        }
    ),
    "correr": new undum.SimpleSituation(
        "\
        <p>Empiezas a correr como no lo has hecho nunca. Incluso m\u00E1s que cuando estas\
        a punto de perder el autob\u00FAs.</p> \
        <p>Llevabas los cordones de los zapatos desabrochados \
        y te tropiezas. Se te cae la cartera, inmediatamente la recojes y te levantas.<img src='media/games/tutorial/ovni.png' class='float_left'></p>\
        \<p>No tienes escapatoria, acaba ocurriendo lo peor. Eres abducido. Comienza la\
        luz verde a elevarte,\
        aunque le cuesta m\u00E1s de lo normal porque est\u00E1s pasado de peso.\
        </p>\
        <p>Una vez dentro del ovni. Apareces dentro de una especie de jaula. <img src='media/games/tutorial/prision.png' class='float_right'>\
        \El miedo inunda tu ser. </p>\
        <p>Se abre una puerta como en las pel\u00EDculas de la que sale una neblina que poco a poco va aumentando\
        \de tama\u00F1o.</p><p> Aparece la silueta de un humano, qu\u00E9 raro pensabas que los aliens eran m\u00E1s peque\u00F1os.\
        <img src='media/games/tutorial/silueta.png' class='float_left'></p>\
        \<p>-\u00BFHola, eres Gurb? -dijo el extraterreste.</p>\
        <p>-No, no lo soy -le respondes.</p>\
        <p>Se te acerca y para tu sorpresa tiene la apariencia de:  <a href='ronaldo'>Cristiano Ronaldo</a>,\
        <a href='victor'>\ntu profesor de Desarrollo \u00C1gil</a> o <a href='mendoza'>Eduardo Mendoza</a>.</p>",
        {
            heading: "Sales corriendo",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:40 PM</p>"
                );
                system.setQuality("cansancio", character.qualities.cansancio+10);
            }
        }
    ),
    "esconderse": new undum.SimpleSituation(
        "\
        <p>Est\u00E1s detr\u00E1s de un contenedor. Han pasado 5 minutos y el ovni no parece irse.\
        Tienes mucho miedo y estas muerto de hambre.</p><p> Decides moverte poco a poco reptando por el suelo.\
        Te encuentras en la delgada l\u00EDnea entre parecer un militar o un tonto. Te das cuenta de que se te ha caido la \
        cartera m\u00E1s atr\u00E1s, vuelves para recojerla y el platillo volante te\
        detecta y se mueve hacia ti.<img src='media/games/tutorial/ovni.png' class='float_left'></p><p> No tienes escapatoria, acaba ocurriendo lo peor. Eres abducido. Comienza la\
        luz verde a elevarte,\
        aunque le cuesta m\u00E1s de lo normal porque est\u00E1s pasado de peso.\
        </p>\
        <p>Una vez dentro del ovni. Apareces dentro de una especie de jaula. <img src='media/games/tutorial/prision.png' class='float_right'>Tienes los pantalones sucios por \
        \arrastrarte por el suelo. El miedo inunda tu ser\
        <p>Se abre una puerta como en las pel\u00EDculas de la que sale una neblina que poco a poco va aumentando\
        \de tama\u00F1o.</p><p> Aparece la silueta de un humano, qu\u00E9 raro pensabas que los aliens eran m\u00E1s peque\u00F1os.\
        <img src='media/games/tutorial/silueta.png' class='float_left'></p>\
        \<p>-\u00BFHola, eres Gurb? -dijo el extraterreste.</p>\
        <p>-No, no lo soy -le respondes.</p>\
        <p>Se te acerca y para tu sorpresa tiene la apariencia de:  <a href='ronaldo'>Cristiano Ronaldo</a>,\
        <a href='victor'>\ntu profesor de Desarrollo \u00C1gil</a> o <a href='mendoza'>Eduardo Mendoza</a>.</p>",
        {
            heading: "Tratas de esconderte",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>14:40 PM</p>"
                );
                system.setQuality("cansancio", character.qualities.cansancio+6);
            }
        }
    ),
    /* Escenas 3  */
    "ronaldo": new undum.SimpleSituation(
        "\
        <p>\u00BFPor qu\u00E9 eres Cristiano Ronaldo? -le preguntas.</p>\
        \<p>-Nuestra especie tiene la capacidad de transformarse en cualquier persona.\
        <img src='media/games/tutorial/alien.png' class='float_right'> Hice una consulta indexada de 50 ntuplas de personas famosas de vuestro planeta en nuestra base de datos\
        y adopte la primera apariencia que v\u00ED. -te contesta.</p>\
        <p>-Mmmm...Pues para pasar desapercibido que digamos no es \u00FAtil esta apariencia \u00BFY que haces aqu\u00ED? -le preguntas</p>\
        <p>Es una historia muy larga, he venido a vuestro planeta en busca de un compa\u00F1ero.\
        Concretamente estoy buscando a Gurb, desaparecido en vuestro planeta adoptando diferentes apariencias\
        -te responde.</p>\
         <p>-Pues ni idea, no se de qui\u00E9n me hablas.\
         -\u00BFMe puedo ir? -le contestas.</p>\
        <p>-S\u00ED, sin problema. \u00BFDonde te dejo? -te responde.</p>\
        <p>-En el Carrefour. -le contestas.</p>\
        <p>Justo antes de abandonar el platillo volante:</p>\
        <p>-\u00A1Espera! se te ha caido la cartera, t\u00F3mala. -te advierte.</p>\
        <p>-Ah, muchas gracias. Menudo problem\u00F3n ir <a href='menufinal'> a comprar </a> sin dinero...jaja -le contestas.</p>\
        </p>",
        {
            heading: "El extraterreste es Cristiano Ronaldo",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>15:10 PM</p>"
                );
                system.setQuality("hambre", character.qualities.hambre+1);
                system.setQuality("cansancio", character.qualities.cansancio+2);
            }
        }
    ),
    "victor": new undum.SimpleSituation(
    "\
        <p>\u00BFPor qu\u00e9 eres Victor? -le preguntas.</p>\
        \<p>-Nuestra especie tiene la capacidad de transformarse en cualquier persona.\
        <img src='media/games/tutorial/alien.png' class='float_right'>Hice una consulta indexada de 66 ntuplas de personas en la provincia de Ja\u00E9n y adopt\u00E9 la primera apariencia que v\u00ED. -te contesta.</p>\
        <p>-Mmmm... que casualidad \u00BFY que haces aqu\u00ED? -le preguntas.</p>\
        <p>-Es una historia muy larga, he venido a vuestro planeta en busca de un compa\u00F1ero\
        Concretamente estoy buscando a Gurb, desaparecido en vuestro planeta adoptando \
        diferentes apariencias. -te responde.</p>\
        <p>-Pues ni idea, no se de qui\u00E9n me hablas.\
         -\u00BFMe puedo ir? -le contestas.</p>\
        <p>-S\u00ED, sin problema. \u00BFDonde te dejo? -te responde.</p>\
        <p>-En el Carrefour. -le contestas.</p>\
        <p>Justo antes de abandonar el platillo volante:</p>\
        <p>-\u00A1Espera! se te ha caido la cartera, t\u00F3mala. -te advierte.</p>\
        <p>-Ah, muchas gracias. Menudo problem\u00F3n ir <a href='menufinal'> a comprar </a> sin dinero...jaja -le contestas.</p>\
        </p>",
        {
            heading: "El extraterreste es tu profesor de Desarrollo \u00C1gil",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>15:12 PM</p>"
                );
                system.setQuality("hambre", character.qualities.hambre+3);
                system.setQuality("cansancio", character.qualities.cansancio+1);
            }
        }
    ),
    "mendoza": new undum.SimpleSituation(
        "\
        <p>\u00BFPor qu\u00E9 eres Eduardo Mendoza? -le preguntas.</p>\
        \<p>-Nuestra especie tiene la capacidad de transformarse en cualquier persona.\
        Eduardo Mendoza se forr\u00F3 haciendo un libro sobre m\u00ED sin darme ni un duro, ''Sin noticias de Gurb'' \
        o algo as\u00ED se llamaba...</p><p>Todo mentira. Desde entonces lo tengo en la lista negra. -te contesta.\
        </p><p>-Pues vaya... \u00BFY que haces aqu\u00ED? -le preguntas <img src='media/games/tutorial/alien.png' class='float_left'>\
        </p><p>-Es una historia muy larga, he venido a vuestro planeta en busca de un compa\u00F1ero\
        Concretamente estoy buscando a Gurb, desaparecido en vuestro planeta adoptando\
        diferentes apariencias -te responde.</p>\
        <p>-Pues ni idea, no se de qui\u00E9n me hablas. \
        -\u00BFMe puedo ir? -le contestas.</p>\
        <p>-S\u00ED, sin problema. \u00BFDonde te dejo? -te responde.</p>\
        <p>-En el Carrefour. -le contestas.</p>\
        <p>Justo antes de abandonar el platillo volante:</p>\
        <p>-\u00A1Espera! se te ha caido la cartera, t\u00F3mala. -te advierte.</p>\
        <p>-Ah, muchas gracias. Menudo problem\u00F3n ir <a href='menufinal'> a comprar </a> sin dinero...jaja -le contestas.</p>\
        </p>",
        {
            heading: "El extraterreste es Eduardo Mendoza",
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>15:15 PM</p>"
                );
                system.setQuality("hambre", character.qualities.hambre+2);
                system.setQuality("cansancio", character.qualities.cansancio+4);
            }
        }
    ),
    /* Escenas 4 */
    final1: new undum.SimpleSituation(
        "<p>Te despides de tu nuevo amigo alien. Quieres pararte a tuitearlo pero\
        tu hambre urge m\u00E1s. <img src='media/games/tutorial/supermercado.png' class='float_left'> </p><p>Te diriges hacia la lontana puerta del supermercado y\
        recorres esos largos pasillos. A lo lejos ves tu ansiado objetivo, el tomate\
        frito.</p><p> Si te paras a pensarlo parece un poco subrealista lo que te acaba de pasar.\
        Pero por fin est\u00E1s en la caja, metes la mano en el bolsillo y\
        sacas la cartera pero est\u00E1 vac\u00EDa... \
        </p><p>Algunas palabras irreproducibles salen de tu boca mientras te quedas mirando al infinito.\
        \
        El extraterreste te ha desvalijado la cartera antes de d\u00E1rtela.\
        <img src='media/games/tutorial/cartera.png' class='float_right'></p><p>Finalmente llegas a casa con las manos vac\u00EDas y hambriento. Abres\
        la puerta, vas a la concina y te comes los macarrones sin tomate.\
        <p><b>FIN</b>\
        </p>",
        {
            
            heading: "Final 1: Un alien\u00EDgena te deja en el Carrefour",
            
            canView: function(character, system, host) {
                return character.qualities.hambre > 0;
            }
            
        }
    ),
    final2: new undum.SimpleSituation(
        "<p>Te despides de tu nuevo amigo alien. Quieres pararte a tuitearlo pero\
        tu hambre urge m\u00E1s. <img src='media/games/tutorial/supermercado.png' class='float_left'></p><p>\
        Te diriges hacia la lontana puerta del supermercado y\
        recorres esos largos pasillos. A lo lejos ves tu ansiado objetivo, el tomate\
        frito.</p><p>Si te paras a pensarlo parece un poco subrealista lo que te acaba de pasar.\
        Pero por fin est\u00E1s en la caja, metes la mano en el bolsillo y\
        sacas la cartera pero est\u00E1 vac\u00EDa. \
        Algunas palabras irreproducibles salen de tu boca mientras te quedas mirando al infinito.\
        \
        El extraterreste te ha desvalijado la cartera antes de d\u00E1rtela.</p><p>\
        <img src='media/games/tutorial/cartera.png' class='float_right'>Finalmente sigues el camino de vuelta a casa con las manos vac\u00EDas.\
        </p><p>Te dispones a abrir la puerta y...</p><p>\u00A1Lo que te faltaba! Te has dejado las llaves dentro de casa. Te has quedao sin comer y fuera de casa.\
        \<p>\
        \
        <b>FIN</b>\
        </p>",
        {
            
            heading: "Final 2: Un alien\u00EDgena te deja en el Carrefour",
            
        }
    ),
   
     "menufinal": new undum.SimpleSituation(
        "<p></p>",
        {
            tags: ["example"],
            enter: function(character, system, from) {
                system.doLink('example-choices');
            },
            optionText: "ELECCI\u00D3N DE FINAL:",
            displayOrder: 1,
            canChoose: function(character, system, host) {
                return character.qualities.luck > 0;
            }
        }
    ),

    "llavesnoolvidadas": new undum.SimpleSituation(
        "<p></p>",
        {
            tags: ["example"],
            enter: function(character, system, from) {
                system.doLink('final1');
            },
            optionText: "Final 1 (No te has dejado las llaves en casa)",
            displayOrder: 2,
            canChoose: function(character, system, host) {
                return character.qualities.luck > 0;
            }
        }
    ),

   

    "llavesolvidadas": new undum.SimpleSituation(
        "<p></p>",
        {
            tags: ["example"],
            enter: function(character, system, from) {
                system.doLink('final2');
            },
            optionText: "Final 2 (Te has dejado las llaves en casa)",
            displayOrder: 3,
            canChoose: function(character, system, host) {
                return character.qualities.luck <= 0;
            }
        }
    ),
    

};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "inicio";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    cansancio: new undum.IntegerQuality(
        "Cansacio", {priority:"0002", group:'stats'}
    ),
    hambre: new undum.NumericQuality(
        "Hambre", {priority:"0003", group:'stats'}
    ),
    luck: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='cansancio, hambre and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Llaves</span>",
        {priority:"0001", group:'stats'}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.cansancio = 5;
    character.qualities.hambre = 5;
    character.qualities.luck = 0;
    system.setCharacterText("<p></p>");
};

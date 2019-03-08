import { Component, OnInit, OnDestroy } from '@angular/core'
import { IFrequentlyAskedQuestions } from '../../_models/frequently-asked-questions'
import { Meta, Title } from '@angular/platform-browser';

@Component({
   selector: 'app-metodologia',
   templateUrl: './metodologia.component.html',
   styleUrls: ['./metodologia.component.css'],
})
export class MetodologiaComponent implements OnInit, OnDestroy {
   public faqs: IFrequentlyAskedQuestions[]

   constructor(
      private meta: Meta,
      private title: Title
   ) { }

   ngOnInit() {
      this.generateFAQs()
      this.setMetas();
   }
   ngOnDestroy() {
      this.unsetMetas();
   }
   setMetas() {
      this.meta.removeTag("name='robots'");
      this.title.setTitle("Analítica judicial & Rating legal | Emérita Legal");
      this.meta.addTag({
         name: "description",
         content: "Revelamos datos nunca antes disponibles sobre abogados, jueces y otras partes a través del análisis de la BigData judicial. Decide mejor basándote en datos."
      })
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag("name='description'");
   }

   private generateFAQs() {
      this.faqs = []

      this.faqs.push({
         question: '¿Qué es el Índice de rendimiento judicial o IRJ?',
         answer: `Es el <b>primer sistema de evaluación objetiva e independiente del rendimiento judicial de abogados y despachos</b>. Se basa <b>en el análisis</b> de sus trayectorias en <b>millones de casos</b> y en la aplicación de un <b>algoritmo basado en técnicas de estadística avanzada</b>, cuya fiabilidad ha sido ampliamente validada por la comunidad matemática.
            <br><br><b>El algoritmo puntúa a cada abogado en cada especialidad en función de su trayectoria</b> y de la comparativa de esta con la trayectoria de todos los abogados de su misma categoría de antigüedad en casos similares. 
            <br><br><b>EL IRJ es el único sistema de posicionamiento de los abogados y despachos en Emérita Legal</b>, sin que sea posible posicionarse por otros medios.`,
      })

      this.faqs.push({
         question: '¿Cómo funciona el algoritmo? ¿Es realmente objetivo?',
         answer: `El algoritmo crea un <b>terreno de juego objetivo</b> evaluando a los abogados a través de la <b>aplicación de reglas idénticas para todos, basadas en los datos extraídos</b> de las resoluciones judiciales analizadas.
            <br><br>La evaluación de cada abogado en cada especialidad se basa en la comparativa con otros abogados que participan en casos similares y en <b>dos factores clave: la experiencia y los resultados</b>. Dentro de cada uno de estos factores <b>se tienen en cuenta distintos indicadores de rendimiento (KPIs)</b> como son la especialización, progresión, dificultad, actualización, relevancia… que a su vez tienen en cuenta <b>múltiples variables</b> extraídas de cada resolución (tipo de fallo, abogados, juzgado, fechas…)
            <br><br>Así, <b>conseguimos establecer una puntuación objetiva para cada abogado en cada especialidad</b> que, a su vez, permite determinar su posición en nuestro ranking estatal, autonómico y provincial.`,
      })

      this.faqs.push({
         question:
            '¿Cómo se valora el éxito de un abogado en un proceso judicial? ',
         answer: `La tasa de éxito se integra dentro del <b>factor resultados, que se evalúa principalmente a través de dos indicadores</b> combinados: <b>la tasa de éxito y la dificultad media</b> analógica.
            <br><br>La <b>tasa de éxito</b> es un porcentaje que pone de manifiesto cuantas veces el abogado obtiene un resultado positivo, es decir, en qué medida es capaz de conseguir lo que solicita para su cliente en función de su posición procesal y otras variables. Nuestro sistema de analítica judicial identifica hasta <b>13 tipos de fallos distintos en cada resolución</b> valorando no solo los resultados absolutos (ganado/perdido) sino también los parciales, procesales…
            <br><br>La tasa de éxito por sí sola no es un indicador suficiente, sino que <b>el algoritmo la valora siempre en relación con la dificultad media de conseguir ese resultado</b> en cada una de las especialidades, materias, posiciones, jueces, etc… 
            <br><br><i>Un 15% puede ser una gran tasa de éxito si la media de otros abogados en casos similares es de un 8% y un 60% puede ser baja si la media se sitúa en el 90%.</i>
            <br><br><b>El factor resultados no supone el único criterio del IRJ</b> sino que se valora también la experiencia del abogado así como otros indicadores de similar importancia.`,
      })

      this.faqs.push({
         question:
            '¿Qué tipos de datos usamos? ¿Son fiables las estadísticas? ¿Son transparentes?',
         answer: `<b>Utilizamos sentencias y otros tipos de resoluciones judiciales procedentes de los distintos juzgados y tribunales de España</b> recopiladas principalmente de la web, de distintos profesionales así como de otras fuentes.
            <br><br>De cada resolución judicial, <b>nuestro sistema de analítica judicial detecta hasta de 45 variables</b>: fecha, tipo de resolución (sentencia, auto…), orden, especialidad, sala, sección, órgano judicial, jueces o magistrados, instancia, tipo de fallo, abogados, partes (demandante, demandada…), rol de las partes, posición procesal, perfil del cliente, rol de las partes…
            <br><br>Nuestra base de datos no refleja la totalidad de casos en los que ha participado cada abogado sino que <b>su objetivo es la creación de una muestra estadística relevante que</b>, mediante la detección de patrones, tendencias y valores atípicos, <b>permite la comparativa de los abogados en términos de igualdad y objetividad y supone una aproximación altamente fiable de la realidad</b>, pero no perfecta.
            <br><br>Para una mayor transparencia <b>cada abogado puede, a través de su área privada, visualizar las resoluciones</b> que se han analizado para establecer su trayectoria y calcular su IRJ, <b>así como plantear alguna mejora</b> sobre las variables detectadas que será valorada por nuestro equipo jurídico.`,
      })

      this.faqs.push({
         question:
            '¿Se tienen en cuenta los acuerdos? ¿Esto distorsiona la comparativa?',
         answer: `Para mantener la objetividad <b>sólo se tienen en cuenta los acuerdos homologados judicialmente</b>, al existir una resolución judicial que los ampara.
            <br><br>Respecto a <b>los acuerdos no judiciales no se tienen en cuenta</b> ni se permite su subida por los profesionales en modo alguno. Esta ausencia total de acuerdos no judiciales se realiza de manera total y afecta de forma homogénea a todos los abogados, por lo que podemos afirmar que <b>no distorsiona la comparativa a efectos estadísticos.</b>`,
      })

      this.faqs.push({
         question:
            '¿Qué tipos de abogados se evalúan? ¿Se incluyen otros trabajos no judiciales?',
         answer: `Podemos afirmar que <b>el sistema actualmente evalúa con éxito el rendimiento judicial de los llamados abogados “litigadores”</b> (los que van a juicios), no evaluando otras actividades de estos ni a otros abogados orientados más a labores de asesoramiento o consultoría.`,
      })

      this.faqs.push({
         question:
            '¿Puede cambiar el IRJ de un abogado y su posición en los rankings?',
         answer: `<b>Los abogados</b> y otros profesionales <b>pueden mejorar sus estadísticas, IRJ y posicionamiento a través del envío de resoluciones</b> judiciales a Emérita para su análisis.
            <br><br>Además, rastreamos otras fuentes y procedemos a analizar e indexar nuevas resoluciones de manera periódica, lo que puede producir variaciones en la posición ocupada por los profesionales.`,
      })
   }
}

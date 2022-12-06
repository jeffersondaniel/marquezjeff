import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'

const i18next = require('i18next')

// comment this out if using the language detector
const ISSERVER = typeof window === "undefined";
if(!ISSERVER) {
  if (localStorage.getItem('i18nextLng') === null) {
    localStorage.setItem('i18nextLng', 'en')
  }
}

i18next
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: i18next.options.lng, //if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          header: {
            docs_link: 'API Docs'
          },
          jobs: {
            latest_tab: 'LATEST RUN',
            history_tab: 'RUN HISTORY',
            location: 'LOCATION',
            empty_title: 'No Run Information Available',
            empty_body: 'Try adding some runs for this job.',
            runinfo_subhead: 'FACETS',
            runs_subhead: 'FACETS'
          },
          search: {
            search: 'Search',
            jobs: 'Jobs',
            and: 'and',
            datasets: 'Datasets'
          },
          lineage: {
            empty_title: 'No node selected',
            empty_body: 'Try selecting a node through search or the jobs or datasets page.'
          },
          sidenav: {
            jobs: 'JOBS',
            datasets: 'DATASETS',
            events: 'EVENTS'
          },
          namespace_select: {
            prompt: 'ns'
          },
          dataset_info: {
            empty_title: 'No Fields',
            empty_body: 'Try adding dataset fields.',
            facets_subhead: 'FACETS',
            run_subhead: 'Created by Run',
            duration: 'Duration'
          },
          datasets: {
            latest_tab: 'LATEST SCHEMA',
            history_tab: 'VERSION HISTORY'
          },
          datasets_route: {
            empty_title: 'No datasets found',
            empty_body: 'Try changing namespaces or consulting our documentation to add datasets.',
            heading: 'DATASETS',
            name_col: 'NAME',
            namespace_col: 'NAMESPACE',
            source_col: 'SOURCE',
            updated_col: 'UPDATED AT'
          },
          jobs_route: {
            empty_title: 'No jobs found',
            empty_body: 'Try changing namespaces or consulting our documentation to add jobs.',
            heading: 'JOBS',
            name_col: 'NAME',
            namespace_col: 'NAMESPACE',
            updated_col: 'UPDATED AT',
            latest_run_col: 'LATEST RUN DURATION'
          },
          runs_columns: {
            id: 'ID',
            state: 'STATE',
            created_at: 'CREATED AT',
            started_at: 'STARTED AT',
            ended_at: 'ENDED AT',
            duration: 'DURATION'
          }
        }
      },
      fr: {
        translation: {
          header: {
            docs_link: 'Documents API'
          },
          jobs: {
            latest_tab: 'DERNIÈRE COURSE',
            history_tab: 'HISTORIQUE D\'EXECUTION',
            location: 'EMPLACEMENT',
            empty_title: 'Pas de Course les Informations Disponibles',
            empty_body: 'Essayez d\'ajouter quelques exécutions pour ce travail.',
            runinfo_subhead: 'FACETTES',
            runs_subhead: 'FACETTES'
          },
          search: {
            search: 'Recherche',
            jobs: 'd\'Emplois',
            and: 'et',
            datasets: 'Jeux de Données'
          },
          lineage: {
            empty_title: 'Aucun nœud sélectionné',
            empty_body:
              'Essayez de sélectionner un nœud via la recherche ou la page des travaux ou des jeux de données.'
          },
          sidenav: {
            jobs: 'EMPLOIS',
            datasets: 'JEUX DE DONNÉES',
            events: 'ÉVÉNEMENTS'
          },
          namespace_select: {
            prompt: 'en'
          },
          dataset_info: {
            empty_title: 'Aucun jeu de données trouvé',
            empty_body: 'Essayez d\'ajouter des champs de jeu de données.',
            facets_subhead: 'FACETTES',
            run_subhead: 'Créé par Run',
            duration: 'Durée'
          },
          datasets: {
            latest_tab: 'DERNIER SCHEMA',
            history_tab: 'HISTORIQUE DES VERSIONS'
          },
          datasets_route: {
            empty_title: 'Aucun jeu de données trouvé',
            empty_body:
              'Essayez de modifier les espaces de noms ou consultez notre documentation pour ajouter des ensembles de données.',
            heading: 'JEUX DE DONNÉES',
            name_col: 'NOM',
            namespace_col: 'ESPACE DE NOMS',
            source_col: 'SOURCE',
            updated_col: 'MISE À JOUR À'
          },
          jobs_route: {
            empty_title: 'Aucun emploi trouvé',
            empty_body:
              'Essayez de modifier les espaces de noms ou consultez notre documentation pour ajouter des travaux.',
            heading: 'EMPLOIS',
            name_col: 'NOM',
            namespace_col: 'ESPACE DE NOMS',
            updated_col: 'MISE À JOUR À',
            latest_run_col: 'DERNIÈRE DURÉE D\'EXÉCUTION'
          },
          runs_columns: {
            id: 'ID',
            state: 'ETAT',
            created_at: 'CRÉÉ À',
            started_at: 'COMMENCÉ À',
            ended_at: 'TERMINÉ À',
            duration: 'DURÉE'
          }
        }
      },
      es: {
        translation: {
          header: {
            docs_link: 'Documentos API'
          },
          jobs: {
            latest_tab: 'ÚLTIMA EJECUCIÓN',
            history_tab: 'HISTORIAL DE EJECUCIONES',
            location: 'UBICACIÓN',
            empty_title: 'No hay Información de Ejecución Disponible',
            empty_body: 'Intente agregar algunas ejecuciones para este trabajo.',
            runinfo_subhead: 'FACETAS',
            runs_subhead: 'FACETAS'
          },
          search: {
            search: 'Buscar',
            jobs: 'Trabajos',
            and: 'y',
            datasets: 'Conjuntos de Datos'
          },
          lineage: {
            empty_title: 'Ningún nodo seleccionado',
            empty_body:
              'Intente seleccionar un nodo mediante la búsqueda o la página de trabajos o conjuntos de datos.'
          },
          sidenav: {
            jobs: 'TRABAJOS',
            datasets: 'CONJUNTOS DE DATOS',
            events: 'EVENTOS'
          },
          namespace_select: {
            prompt: 'en'
          },
          dataset_info: {
            empty_title: 'No se encontraron conjuntos de datos',
            empty_body: 'Intente agregar campos de conjuntos de datos.',
            facets_subhead: 'FACETAS',
            run_subhead: 'Creado por Ejecutar',
            duration: 'Duración'
          },
          datasets: {
            latest_tab: 'ESQUEMA ÚLTIMO',
            history_tab: 'HISTORIAL DE VERSIONES'
          },
          datasets_route: {
            empty_title: 'No se encontraron conjuntos de datos',
            empty_body:
              'Intente cambiar los espacios de nombres o consultar nuestra documentación para agregar conjuntos de datos.',
            heading: 'CONJUNTOS DE DATOS',
            name_col: 'NOMBRE',
            namespace_col: 'ESPACIO DE NOMBRES',
            source_col: 'FUENTE',
            updated_col: 'ACTUALIZADO EN'
          },
          jobs_route: {
            empty_title: 'No se encontraron trabajos',
            empty_body:
              'Intente cambiar los espacios de nombres o consultar nuestra documentación para agregar trabajos.',
            heading: 'TRABAJOS',
            name_col: 'NOMBRE',
            namespace_col: 'ESPACIO DE NOMBRES',
            updated_col: 'ACTUALIZADO EN',
            latest_run_col: 'DURACIÓN DE LA ÚLTIMA EJECUCIÓN'
          },
          runs_columns: {
            id: 'ID',
            state: 'ESTADO',
            created_at: 'CREADO EN',
            started_at: 'EMPEZÓ A LAS',
            ended_at: 'TERMINÓ EN',
            duration: 'DURACIÓN'
          }
        }
      },
      pl: {
        translation: {
          header: {
            docs_link: 'Dokumentacja API'
          },
          jobs: {
            latest_tab: 'OSTATNI WYKONANIE',
            history_tab: 'HISTORIA WYKONAŃ',
            location: 'LOKALIZACJA',
            empty_title: 'Brak dostępnych informacji o wykonaniu',
            empty_body: 'Spróbuj dodać kilka przebiegów dla tego zadania.',
            runinfo_subhead: 'ASPECTY',
            runs_subhead: 'ASPECTY'
          },
          search: {
            search: 'Wyszukiwanie',
            jobs: 'Zadania',
            and: 'i',
            datasets: 'Zbiory Danych'
          },
          lineage: {
            empty_title: 'Nie wybrano węzła',
            empty_body:
              'Spróbuj wybrać węzeł za pomocą wyszukiwania lub strony zadań lub zestawów danych.'
          },
          sidenav: {
            jobs: 'ZADANIA',
            datasets: 'ZBIORY DANYCH',
            events: 'WYDARZENIA'
          },
          namespace_select: {
            prompt: 'pn'
          },
          dataset_info: {
            empty_title: 'Nie znaleziono zbiorów danych',
            empty_body: 'Spróbuj dodać pola zbiory danych.',
            facets_subhead: 'ASPECTY',
            run_subhead: 'Stworzony przez Run',
            duration: 'Czas trwania'
          },
          datasets: {
            latest_tab: 'NAJNOWSZY SCHEMAT',
            history_tab: 'HISTORIA WERSJI'
          },
          datasets_route: {
            empty_title: 'Nie znaleziono zbiorów danych',
            empty_body:
              'Spróbuj zmienić przestrzenie nazw lub zapoznaj się z naszą dokumentacją, aby dodać zbiory danych.',
            heading: 'ZBIORY DANYCH',
            name_col: 'NAZWA',
            namespace_col: 'PRZESTRZEŃ NAZW',
            source_col: 'ŹRÓDŁO',
            updated_col: 'ZAKTUALIZOWANO'
          },
          jobs_route: {
            empty_title: 'Nie znaleziono ofert pracy',
            empty_body:
              'Spróbuj zmienić przestrzenie nazw lub zapoznaj się z naszą dokumentacją, aby dodać zadania.',
            heading: 'ZADANIA',
            name_col: 'NAZWA',
            namespace_col: 'PRZESTRZEŃ NAZW',
            updated_col: 'ZAKTUALIZOWANO',
            latest_run_col: 'NAJNOWSZY CZAS TRWANIA'
          },
          runs_columns: {
            id: 'ID',
            state: 'PAŃSTWO',
            created_at: 'UTWORZONY W',
            started_at: 'ROZPOCZĘŁO SIĘ O GODZ',
            ended_at: 'ZAKOŃCZONE O GODZ',
            duration: 'TRWANIE'
          }
        }
      }
    }
  })

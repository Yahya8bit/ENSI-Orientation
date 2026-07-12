// Semestre-5 specialization tracks and their module lists.

export const SPEC_BADGE_LABEL = {'ST-IoT':'IoT','CV':'DS'};
export const SPECIALIZATIONS = [
  {id:'AI',name:'Artificial Intelligence',nameFr:'Intelligence Artificielle',color:'#D97706',desc:'Apprentissage automatique, deep learning, NLP et systèmes cognitifs.',
    compulsory:['AI.5.1','AI.5.2','AI.5.3','AI.5.4','AI.5.5','ISA.5.1','ISA.5.2','MAT.5.2','AI.5.6','ISA.5.6','DOS.5.8','DOS.5.2'],
    optional:['ISA.5.3','MAT.5.1','ISA.5.5','ISA.5.4','AI.5.7','ISA.5.7','ISA.5.8','AI.5.10','AI.5.8','AI.5.9','AI.5.11']},
  {id:'GL',name:'Software Engineering',nameFr:'Génie Logiciel',color:'#2563EB',desc:'Qualité logicielle, DevOps, ingénierie cloud et architecture avancée.',
    compulsory:['SE.5.1','SE.5.2','SE.5.3','SE.5.4','SE.5.5','AI.5.3','AI.5.1','DOS.5.1','DOS.5.2','DOS.5.3'],
    optional:['ISA.5.1','ISA.5.3','ISA.5.7','ISA.5.4','ISA.5.9','ISA.5.2','ISA.5.10','ISA.5.11','ISA.5.6','ISA.5.8']},
  {id:'CV',name:'Data Science & Computer Vision',nameFr:'Vision par Ordinateur et Science des Données',color:'#DB2777',desc:'Traitement d\'images, reconnaissance de formes, analyse big data et imagerie médicale.',
    compulsory:['CV.5.1','CV.5.2','CV.5.3','CV.5.4','CV.5.5','CV.5.6','CV.5.7','CV.5.8','CV.5.9','AI.5.16','CV.5.11'],
    optional:['DOS.5.2','DOS.5.3','DOS.5.8','SE.5.3']},
  {id:'IF',name:'Financial Engineering',nameFr:'Ingénierie Financière',color:'#0D9488',desc:'Finance quantitative, trading algorithmique, blockchain et gestion des risques.',
    compulsory:['FIN.5.1','MAT.5.3','FIN.5.2','FIN.5.3','ISA.5.1','FIN.5.4','MAT.5.5','MAT.5.4','ISA.5.4','AI.5.1','FIN.5.6','AI.5.12','FIN.5.5'],
    optional:['DOS.5.2','SE.5.3','ISA.5.7','DOS.5.3']},
  {id:'SLE',name:'Embedded Software and Systems',nameFr:'Systèmes et Logiciels Embarqués',color:'#7C3AED',desc:'Systèmes temps réel, conception FPGA, protocoles IoT et Linux embarqué.',
    compulsory:['AI.5.5','AI.5.12','DOS.5.4','DOS.5.5','DOS.5.6','DOS.5.7','ESDV.5.1','ESDV.5.2','ESDV.5.3','ESDV.5.4','ESDV.5.5','ESDV.5.6'],
    optional:['DOS.5.8','DOS.5.9','ESDV.5.7','ESDV.5.8','ESDV.5.9','IAP.5.1','IAP.5.2','IAP.5.3','SEC.5.1','SEC.5.2','SEC.5.3','SEC.5.4','ISA.5.12']},
  {id:'ST-IoT',name:'Services, Technologies & IoT',nameFr:'Services, Technologies et Internet des Objets',color:'#06B6D4',desc:'Cloud computing, microservices, applications IoT et sécurité réseau.',
    compulsory:['ESEP.5.1','ESEP.5.2','ESEP.5.3','NET.5.1','NET.5.2','NET.5.3','NET.5.4','DOS.5.5','DOS.5.6','DOS.5.4','DOS.5.8'],
    optional:['IAP.5.3','DOS.5.11','DOS.5.2','AI.5.12','ISA.5.12','ISA.5.1','AI.5.5','SEC.5.2','SEC.5.4']},
];

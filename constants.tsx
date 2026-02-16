
import { IssueType, IssueContent } from './types';

export const ISSUES: Record<IssueType, IssueContent> = {
  [IssueType.DELAY]: {
    title: 'Meu voo atrasou',
    now: [
      'Fotografe o painel com horário previsto e horário atualizado.',
      'Tire foto do portão fechado ou da fila.',
      'Faça print do app da companhia mostrando atraso.',
      'Inicie o cronômetro no app.',
      'Vá ao balcão e peça declaração formal do atraso com motivo específico.'
    ],
    rights: [
      { label: 'A partir de 1 hora', desc: 'Informação clara e atualizada.' },
      { label: 'A partir de 2 horas', desc: 'Alimentação adequada (Voucher ou lanche).' },
      { label: 'A partir de 4 horas', desc: 'Reacomodação, reembolso ou execução por outra companhia.' },
      { label: 'Se houver pernoite', desc: 'Hotel + transporte obrigatórios.' }
    ],
    evidence: [
      'Painel do aeroporto',
      'Relógio do aeroporto',
      'Fila de passageiros',
      'Voucher de alimentação',
      'Conversa no chat/app'
    ],
    templates: [
      {
        label: 'Pedido de Declaração',
        text: 'Solicito, por favor, a declaração formal do atraso com indicação específica do motivo, horário real de partida e opções de reacomodação disponibilizadas.'
      },
      {
        label: 'Registro de Negativa',
        text: 'Registro que a solução apresentada não atende às alternativas legais previstas para a situação e solicito formalização da negativa.'
      },
      {
        label: 'Consumidor.gov',
        text: 'Venho registrar que o voo nº [NUMERO] sofreu atraso de [HORAS] horas, ocasionando perda de compromisso e transtornos relevantes. Solicito solução proporcional ao dano causado.'
      }
    ]
  },
  [IssueType.CANCELLED]: {
    title: 'Voo cancelado',
    now: [
      'Solicite o motivo do cancelamento por escrito.',
      'Peça as três opções: Reacomodação, Reembolso integral ou Outro meio de transporte.',
      'Não aceite solução inferior sem registrar discordância.'
    ],
    rights: [
      { label: 'Opção 1', desc: 'Reacomodação gratuita no próximo vôo disponível (mesmo sendo de outra companhia aérea).' },
      { label: 'Opção 2', desc: 'Reembolso integral (incluindo taxa de embarque).' }
    ],
    evidence: [
      'Certificado de cancelamento',
      'Foto do painel',
      'Emails de notificação'
    ],
    templates: [
      {
        label: 'No Balcão',
        text: 'Meu voo foi cancelado. Exijo as opções de reacomodação em voo próprio ou de terceiros, ou reembolso integral conforme a Resolução 400 da ANAC.'
      },
      {
        label: 'Registro de Negativa',
        text: 'Registro que a solução de reacomodação apresentada não é a mais próxima do horário original e solicito formalização da negativa.'
      }
    ]
  },
  [IssueType.CONNECTION]: {
    title: 'Perdi minha conexão',
    now: [
      'Registre que a conexão foi perdida por atraso anterior.',
      'Solicite reacomodação imediata.',
      'Exija hotel se houver pernoite.',
      'Não compre nova passagem sem registrar negativa formal.'
    ],
    rights: [
      { label: 'Continuidade', desc: 'Reacomodação obrigatória e prioritária.' },
      { label: 'Suporte', desc: 'Assistência material conforme o tempo de espera.' }
    ],
    evidence: [
      'Cartões de embarque de ambos os trechos',
      'Comprovante do atraso do voo original',
      'Vouchers de alimentação negados'
    ],
    templates: [
      {
        label: 'No Balcão',
        text: 'Perdi a conexão devido ao atraso do voo anterior. Solicito reacomodação imediata e assistência material enquanto aguardo.'
      }
    ]
  },
  [IssueType.OVERBOOKING]: {
    title: 'Overbooking',
    now: [
      'Pergunte se estão solicitando voluntários.',
      'Se for preterido involuntariamente, peça compensação imediata.',
      'Solicite declaração escrita.'
    ],
    rights: [
      { label: 'Indenização', desc: 'Pagamento imediato via transferência ou espécie.' },
      { label: 'Extras', desc: 'Reacomodação + Assistência material total.' }
    ],
    evidence: [
      'Documento de preterição de embarque',
      'Foto do portão fechado com funcionários'
    ],
    templates: [
      {
        label: 'Exigência Formal',
        text: 'Fui impedido de embarcar por excesso de passageiros. Exijo a indenização financeira imediata (DES) prevista na Resolução 400 da ANAC.'
      }
    ]
  },
  [IssueType.LUGGAGE]: {
    title: 'Bagagem extraviada',
    now: [
      'NÃO SAIA do aeroporto sem registrar RIB.',
      'Tire foto da etiqueta da bagagem.',
      'Solicite número do protocolo.',
      'Guarde todos os comprovantes de gastos emergenciais.'
    ],
    rights: [
      { label: 'Protocolo', desc: 'O Registro de Irregularidade de Bagagem (RIB) é obrigatório.' },
      { label: 'Reembolso', desc: 'Gastos com itens de primeira necessidade devem ser pagos.' }
    ],
    evidence: [
      'RIB preenchido e assinado',
      'Etiqueta de bagagem (Tag)',
      'Fotos da mala antes e depois'
    ],
    templates: [
      {
        label: 'Reclamação de Bagagem',
        text: 'Registro extravio/dano da bagagem despachada sob etiqueta nº [NUMERO] e solicito protocolo formal e prazo de localização.'
      }
    ]
  }
};

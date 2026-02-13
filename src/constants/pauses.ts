import { Pause } from '../types';

export const PAUSES: Pause[] = [
  // ── BREATHE (4) ──────────────────────────────────────────
  {
    id: 'breathe-1',
    title: 'Square Breath',
    category: 'breathe',
    instruction:
      'Breathe in for 4 counts. Hold for 4. Out for 4. Hold for 4. Repeat four times.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Balban et al., 2023',
    citationDetail:
      'Balban, M.Y. et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 4(1), 100895.',
  },
  {
    id: 'breathe-2',
    title: 'Calm Wave',
    category: 'breathe',
    instruction:
      'Breathe in for 4 counts. Hold for 7 counts. Breathe out for 8 counts. Repeat for 3 minutes.',
    durationSeconds: 180,
    durationLabel: '3 min',
    citation: 'Ma et al., 2017',
    citationDetail:
      'Ma, X. et al. (2017). The effect of diaphragmatic breathing on attention, negative affect and stress. Frontiers in Psychology, 8, 874.',
  },
  {
    id: 'breathe-3',
    title: 'Deep Reset',
    category: 'breathe',
    instruction:
      'Take a double inhale through the nose — a big breath in, then a short extra sip of air. Then a long, slow exhale through the mouth. Repeat for 1 minute.',
    durationSeconds: 60,
    durationLabel: '1 min',
    citation: 'Balban et al., 2023',
    citationDetail:
      'Balban, M.Y. et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 4(1), 100895.',
  },
  {
    id: 'breathe-4',
    title: 'Slow Release',
    category: 'breathe',
    instruction:
      'Breathe in for 4 counts. Breathe out for 8 counts — making your exhale twice as long as your inhale. Repeat gently for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Gerritsen & Band, 2018',
    citationDetail:
      'Gerritsen, R.J.S. & Band, G.P.H. (2018). Breath of life: The respiratory vagal stimulation model of contemplative activity. Frontiers in Human Neuroscience, 12, 397.',
  },

  // ── MOVE (4) ─────────────────────────────────────────────
  {
    id: 'move-1',
    title: 'Stand & Stretch',
    category: 'move',
    instruction:
      'Stand up. Reach your arms overhead. Stretch to one side, then the other. Roll your shoulders. Gently stretch your neck. Take your time for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Shrestha et al., 2016',
    citationDetail:
      'Shrestha, N. et al. (2016). Workplace interventions for reducing sitting at work. Cochrane Database of Systematic Reviews, 3, CD010912.',
  },
  {
    id: 'move-2',
    title: 'Room Shift',
    category: 'move',
    instruction:
      'Stand up and walk to a different room. Look around. Notice the change in environment. Stay for a moment, then return.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Radvansky & Copeland, 2006',
    citationDetail:
      'Radvansky, G.A. & Copeland, D.E. (2006). Walking through doorways causes forgetting. Memory & Cognition, 34(5), 1150-1156.',
  },
  {
    id: 'move-3',
    title: 'Shake It Off',
    category: 'move',
    instruction:
      'Stand up and shake your whole body — hands, arms, legs, shoulders. Shake vigorously for 30 seconds, then rest. Repeat once.',
    durationSeconds: 60,
    durationLabel: '1 min',
    citation: 'Levine, 2010',
    citationDetail:
      'Levine, P.A. (2010). In an Unspoken Voice: How the Body Releases Trauma and Restores Goodness. North Atlantic Books.',
  },
  {
    id: 'move-4',
    title: 'Balance Moment',
    category: 'move',
    instruction:
      'Stand on one foot. Hold for 30 seconds. Switch feet. If you wobble, that is fine — just refocus. Repeat twice.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Woollacott & Shumway-Cook, 2002',
    citationDetail:
      'Woollacott, M. & Shumway-Cook, A. (2002). Attention and the control of posture and gait. Gait & Posture, 16(1), 1-14.',
  },

  // ── SENSE (4) ─────────────────────────────────────────────
  {
    id: 'sense-1',
    title: 'Cold Splash',
    category: 'sense',
    instruction:
      'Go to a sink. Splash cold water on your face. Notice the sensation — the temperature, the shock, the alertness. Pat dry slowly.',
    durationSeconds: 60,
    durationLabel: '1 min',
    citation: 'Khurana & Wu, 1980',
    citationDetail:
      'Khurana, R.K. & Wu, R. (1980). The cold face test: A non-baroreflex mediated test of cardiac vagal function. Annals of Neurology, 10(1), 90.',
  },
  {
    id: 'sense-2',
    title: 'Cool Hands',
    category: 'sense',
    instruction:
      'Run cold water over your hands for 30 seconds. Notice the temperature change. Feel the water between your fingers. Dry your hands slowly.',
    durationSeconds: 60,
    durationLabel: '1 min',
    citation: 'Mäkinen et al., 2008',
    citationDetail:
      'Mäkinen, T.M. et al. (2008). Autonomic nervous function during whole-body cold exposure before and after cold acclimation. Aviation, Space, and Environmental Medicine, 79(9), 875-882.',
  },
  {
    id: 'sense-3',
    title: 'Mindful Wash',
    category: 'sense',
    instruction:
      'Wash your hands slowly and deliberately. Feel the water temperature. Notice the soap texture. Pay attention to each finger. Take your time.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Xu et al., 2012',
    citationDetail:
      'Xu, A.J. et al. (2012). Washing away your (good or bad) luck. Journal of Experimental Social Psychology, 48(1), 174-179.',
  },
  {
    id: 'sense-4',
    title: 'Texture Hunt',
    category: 'sense',
    instruction:
      'Touch 5 different textures around you. Notice each one — is it smooth, rough, warm, cool, soft, hard? Name each texture as you go.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Linehan, 2015',
    citationDetail:
      'Linehan, M.M. (2015). DBT Skills Training Manual, 2nd Edition. Guilford Press.',
  },

  // ── LIGHT & AIR (4) ──────────────────────────────────────
  {
    id: 'light-air-1',
    title: 'Fresh Air',
    category: 'light-air',
    instruction:
      'Open a window or step into a doorway. Breathe the fresh air. Feel the temperature on your skin. Stay for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Allen et al., 2016',
    citationDetail:
      'Allen, J.G. et al. (2016). Associations of cognitive function scores with carbon dioxide, ventilation, and volatile organic compound exposures. Environmental Health Perspectives, 124(6), 805-812.',
  },
  {
    id: 'light-air-2',
    title: 'Sunlight Pause',
    category: 'light-air',
    instruction:
      'Find a spot of sunlight — by a window or outside. Stand in it. Close your eyes and feel the warmth. Stay for 5 minutes.',
    durationSeconds: 300,
    durationLabel: '5 min',
    citation: 'Boubekri et al., 2014',
    citationDetail:
      'Boubekri, M. et al. (2014). Impact of windows and daylight exposure on overall health and sleep quality of office workers. Journal of Clinical Sleep Medicine, 10(6), 603-611.',
  },
  {
    id: 'light-air-3',
    title: 'Step Outside',
    category: 'light-air',
    instruction:
      'Go outside your front door. Stand still. Look around. Notice the air, the light, the sounds. Take 3 deep breaths before returning.',
    durationSeconds: 180,
    durationLabel: '3 min',
    citation: 'Hunter et al., 2019',
    citationDetail:
      'Hunter, M.R. et al. (2019). Urban nature experiences reduce stress in the context of daily life. Frontiers in Psychology, 10, 722.',
  },
  {
    id: 'light-air-4',
    title: 'Sky Gaze',
    category: 'light-air',
    instruction:
      'Look up at the sky — through a window or outside. Notice the colour, the clouds, the light. Let your vision soften. Stay for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Blehm et al., 2005',
    citationDetail:
      'Blehm, C. et al. (2005). Computer vision syndrome: A review. Survey of Ophthalmology, 50(3), 253-262.',
  },

  // ── NATURE (4) ────────────────────────────────────────────
  {
    id: 'nature-1',
    title: 'Barefoot Ground',
    category: 'nature',
    instruction:
      'If you can, take your shoes off and stand on grass, soil, or sand. Feel the ground beneath your feet. Stay for 5 minutes.',
    durationSeconds: 300,
    durationLabel: '5 min',
    citation: 'Chevalier et al., 2012',
    citationDetail:
      'Chevalier, G. et al. (2012). Earthing: Health implications of reconnecting the human body to the Earth\'s surface electrons. Journal of Environmental and Public Health, 2012, 291541.',
  },
  {
    id: 'nature-2',
    title: 'Tree Touch',
    category: 'nature',
    instruction:
      'Find a tree. Touch its bark. Notice the texture, the temperature, the pattern. Look up through its branches. Stay for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Tsunetsugu et al., 2010',
    citationDetail:
      'Tsunetsugu, Y. et al. (2010). Trends in research related to "Shinrin-yoku" (taking in the forest atmosphere or forest bathing). Environmental Health and Preventive Medicine, 15(1), 27-37.',
  },
  {
    id: 'nature-3',
    title: 'Green Walk',
    category: 'nature',
    instruction:
      'Walk to the nearest green space — a park, garden, or patch of trees. Walk slowly. Notice the colours and sounds around you.',
    durationSeconds: 600,
    durationLabel: '10 min',
    citation: 'Bratman et al., 2015',
    citationDetail:
      'Bratman, G.N. et al. (2015). Nature experience reduces rumination and subgenual prefrontal cortex activation. Proceedings of the National Academy of Sciences, 112(28), 8567-8572.',
  },
  {
    id: 'nature-4',
    title: 'Bird Spot',
    category: 'nature',
    instruction:
      'Go to a window or step outside. Look and listen for birds. Try to spot or hear at least one. Notice its colour, its movement, its sound.',
    durationSeconds: 180,
    durationLabel: '3 min',
    citation: 'Hammoud et al., 2022',
    citationDetail:
      'Hammoud, R. et al. (2022). Smartphone-based ecological momentary assessment reveals mental health benefits of birdlife. Scientific Reports, 12, 17589.',
  },

  // ── CONNECT (4) ───────────────────────────────────────────
  {
    id: 'connect-1',
    title: 'Real Talk',
    category: 'connect',
    instruction:
      'Put your phone down and have a conversation with someone nearby. No screens. Just talk and listen for 5 minutes.',
    durationSeconds: 300,
    durationLabel: '5 min',
    citation: 'Teo et al., 2015',
    citationDetail:
      'Teo, A.R. et al. (2015). Does mode of contact with different types of social relationships predict depression in older adults? Journal of the American Geriatrics Society, 63(10), 2014-2022.',
  },
  {
    id: 'connect-2',
    title: 'Eye Contact',
    category: 'connect',
    instruction:
      'The next time you speak to someone, make genuine eye contact. Hold it gently. Notice how it feels to truly see and be seen.',
    durationSeconds: 60,
    durationLabel: '1 min',
    citation: 'Sandstrom & Dunn, 2014',
    citationDetail:
      'Sandstrom, G.M. & Dunn, E.W. (2014). Social interactions and well-being: The surprising power of weak ties. Personality and Social Psychology Bulletin, 40(7), 910-922.',
  },
  {
    id: 'connect-3',
    title: 'Voice Call',
    category: 'connect',
    instruction:
      'Call someone you care about. Not a text — a voice call. Talk for a few minutes about anything. Notice how it feels to hear their voice.',
    durationSeconds: 300,
    durationLabel: '5 min',
    citation: 'Kumar & Epley, 2021',
    citationDetail:
      'Kumar, A. & Epley, N. (2021). It\'s surprisingly nice to hear you: Misunderstanding the impact of communication media can lead to suboptimal choices of how to connect with others. Journal of Experimental Psychology: General, 150(3), 595-607.',
  },
  {
    id: 'connect-4',
    title: 'Pet Moment',
    category: 'connect',
    instruction:
      'Spend time with a pet or a plant. If a pet, stroke them slowly and notice their response. If a plant, touch its leaves and water it with care.',
    durationSeconds: 180,
    durationLabel: '3 min',
    citation: 'Odendaal & Meintjes, 2003',
    citationDetail:
      'Odendaal, J.S.J. & Meintjes, R.A. (2003). Neurophysiological correlates of affiliative behaviour between humans and dogs. The Veterinary Journal, 165(3), 296-301.',
  },

  // ── FOCUS (4) ─────────────────────────────────────────────
  {
    id: 'focus-1',
    title: 'One Object',
    category: 'focus',
    instruction:
      'Pick up one object near you. Examine it closely — its weight, its texture, its colour, its edges. Give it your full attention for 2 minutes.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Jha et al., 2007',
    citationDetail:
      'Jha, A.P. et al. (2007). Mindfulness training modifies subsystems of attention. Cognitive, Affective & Behavioral Neuroscience, 7(2), 109-119.',
  },
  {
    id: 'focus-2',
    title: 'Clear One Surface',
    category: 'focus',
    instruction:
      'Choose one surface — a desk, a shelf, a counter. Clear it completely. Put everything in its place. Notice how the cleared space feels.',
    durationSeconds: 300,
    durationLabel: '5 min',
    citation: 'Saxbe & Repetti, 2010',
    citationDetail:
      'Saxbe, D.E. & Repetti, R.L. (2010). No place like home: Home tours correlate with daily patterns of mood and cortisol. Personality and Social Psychology Bulletin, 36(1), 71-81.',
  },
  {
    id: 'focus-3',
    title: 'Listen Around',
    category: 'focus',
    instruction:
      'Close your eyes. Listen carefully to the sounds around you. Try to identify each one — near and far. Count how many different sounds you notice.',
    durationSeconds: 120,
    durationLabel: '2 min',
    citation: 'Zeidan et al., 2010',
    citationDetail:
      'Zeidan, F. et al. (2010). Mindfulness meditation improves cognition: Evidence of brief mental training. Consciousness and Cognition, 19(2), 597-605.',
  },
  {
    id: 'focus-4',
    title: 'Three Good Things',
    category: 'focus',
    instruction:
      'Write down three things you are grateful for today. They can be small — a warm drink, a kind word, a comfortable chair. Take your time.',
    durationSeconds: 180,
    durationLabel: '3 min',
    citation: 'Emmons & McCullough, 2003',
    citationDetail:
      'Emmons, R.A. & McCullough, M.E. (2003). Counting blessings versus burdens: An experimental investigation of gratitude. Journal of Personality and Social Psychology, 84(2), 377-389.',
  },
];

export const CATEGORIES: {
  key: string;
  label: string;
  color: string;
}[] = [
  { key: 'breathe', label: 'Breathe', color: '#5B8FA8' },
  { key: 'move', label: 'Move', color: '#D4915E' },
  { key: 'sense', label: 'Sense', color: '#8B7FB5' },
  { key: 'light-air', label: 'Light & Air', color: '#C4A84D' },
  { key: 'nature', label: 'Nature', color: '#3D6B4A' },
  { key: 'connect', label: 'Connect', color: '#B56576' },
  { key: 'focus', label: 'Focus', color: '#6B8F71' },
];

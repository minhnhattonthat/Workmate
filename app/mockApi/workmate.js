export const login = async (username, password) => {
  return 'e945ae028e2355e123cfdf1b4fbb81ad4e5b2ebc';
};

export const fetchJob = async (jobId, token) => {
  return {
    id: 26074,
    title: 'Kaizen Coffee',
    description:
      'A barista is a person, usually a coffeehouse employee, who prepares and serves espresso-based coffee drinks.',
    wage_amount: '120000.00',
    wage_type: 'per_day',
    client: {
      id: 23507,
      name: 'Kaizen Coffee Co.',
      status: 'active',
      logo: null,
      tier: 'silver',
      website: 'https://www.kaizen.com',
      description: 'Coffee Shop',
    },
    location: {
      id: 32859,
      name: 'Main Branch',
      address: {
        id: 293456,
        country: {
          id: 1,
          name: 'Indonesia',
          code: 'ID',
          currency_code: 'IDR',
          dial_code: '+62',
        },
        street_1:
          '888 6-7 Thanon Ekkamai, Khwaeng Phra Khanong Nuea, Khet Watthana, Krung Thep Maha Nakhon 10110, Thailand',
        street_2: '',
        zip: '10110',
      },
      is_primary: false,
      contact_name: null,
      contact_phone: null,
    },
    position: {
      id: 107,
      name: 'Barista',
      active: true,
    },
    manager: {
      id: 23530,
      name: 'Yai Thong-oon',
      email: 'yai@kaizen.com',
      phone: '+66-955-5695-65',
      role: 'admin',
      locations: [],
    },
  };
};

export const clockIn = async (jobId, latitude, longitude, token) => {
  return {
    id: 347062,
    clock_in_time: '2019-11-17T11:36:37.153179Z',
    clock_out_time: null,
    clock_in_latitude: '-6.2446691000',
    clock_in_longitude: '106.8779620000',
    clock_out_latitude: null,
    clock_out_longitude: null,
    schedule: null,
  };
};

export const clockOut = async (jobId, latitude, longitude, token) => {
  return {
    timesheet: {
      id: 347062,
      clock_in_time: '2019-11-17T11:36:37.153179Z',
      clock_out_time: '2019-11-17T11:40:33.881145Z',
      clock_in_latitude: '-6.2446691000',
      clock_in_longitude: '106.8779620000',
      clock_out_latitude: '-6.2446691000',
      clock_out_longitude: '106.8779620000',
      schedule: null,
    },
    require_feedback: true,
  };
};

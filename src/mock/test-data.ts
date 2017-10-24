/**
 * Created by ekemate on 2017. 03. 07..
 */
export class TestData {
  static partnersResponse = {
    'data': [
      {'id': 15, 'number': '13-479-05', 'name': 'Antal', 'city': 'Sopron'}, {
        'id': 16,
        'number': '12-206-90',
        'name': 'Bal\u00e1zs BT',
        'city': 'Kaposv\u00e1r'
      }, {'id': 33, 'number': '76-877-59', 'name': 'Bal\u00e1zs ZRT', 'city': 'Budapest'}, {
        'id': 36,
        'number': '73-407-72',
        'name': 'Balla',
        'city': 'Budapest'
      }, {'id': 7, 'number': '89-523-96', 'name': 'Balog', 'city': '\n        B\u00e9k\u00e9scsaba'}, {
        'id': 9,
        'number': '18-805-60',
        'name': 'Bodn\u00e1r',
        'city': '\u00c9rd'
      }, {
        'id': 1,
        'number': '70-823-32',
        'name': 'Bogd\u00e1n Kht',
        'city': 'H\u00f3dmez\u0151v\u00e1s\u00e1rhely'
      }, {'id': 29, 'number': '58-114-78', 'name': 'Budai', 'city': 'Budapest'}, {
        'id': 40,
        'number': '37-868-51',
        'name': 'Csonka BT',
        'city': 'Nagykanizsa'
      }, {'id': 11, 'number': '40-086-12', 'name': 'F\u00e1bi\u00e1n', 'city': 'Budapest'}],
    'meta': {
      'pagination': {
        'total': 50,
        'count': 10,
        'per_page': 10,
        'current_page': 1,
        'total_pages': 5,
        'links': {'next': 'http:\/\/api.atkft.dev.mik.bme.hu\/api\/partners?page=2'}
      }
    }
  };

  static contactsListResponse = {
    'data': [{
      'id': 1000000000,
      'name': 'dr. Monostori Attila',
      'phone': '+36 20 464-0147',
      'email': 'monostori.attila@atkft.hu'
    }, {'id': 24, 'name': 'Teszt', 'phone': '123\/456', 'email': 'exampl@example.org'}, {
      'id': 23,
      'name': 'asd',
      'phone': null,
      'email': 'asdasdasd@asd.hu'
    }, {'id': 22, 'name': 'Valaki2', 'phone': null, 'email': 'alma@korte.hu'}, {
      'id': 19,
      'name': 'asdsad',
      'phone': '2123123',
      'email': 'dsds@asds.hu'
    }, {'id': 18, 'name': 'Teszt', 'phone': '213123', 'email': 'alma@alma.hu'}, {
      'id': 17,
      'name': 'Teszt',
      'phone': '+36 30  123 4567',
      'email': '1231242@atkft.hu'
    }, {'id': 16, 'name': 'wqewqe', 'phone': '011111111', 'email': 'email@email.hu'}, {
      'id': 14,
      'name': '',
      'phone': '',
      'email': ''
    }, {'id': 13, 'name': '', 'phone': '', 'email': ''}, {
      'id': 12,
      'name': 'Melis Eszter',
      'phone': '+36305913990',
      'email': 'melis.eszter@nefty.hu'
    }, {'id': 11, 'name': 'Besenyi Edit', 'phone': '', 'email': 'besenyie@alfolditej.hu'}, {
      'id': 10,
      'name': 'Mondovics Mih\u00e1ly',
      'phone': '',
      'email': ''
    }, {'id': 9, 'name': 'J\u00e1mbor Attila', 'phone': '20\/9126822', 'email': ''}, {
      'id': 8,
      'name': 'Telek Zsolt',
      'phone': '20\/9136237',
      'email': ''
    }],
    'meta': {
      'pagination': {
        'total': 21,
        'count': 15,
        'per_page': 15,
        'current_page': 1,
        'total_pages': 2,
        'links': {'next': 'http:\/\/localhost:4100\/api\/contacts?page=2'}
      }
    }
  };

  static boxesResponse = {
    'data': [{
      'id': 5,
      'in': '2017-01-08',
      'out': '2017-01-07',
      'box_number': 'H123',
      'partner_name': 'Fodor',
      'partner_number': '49-047-27',
      'pipe_in': 1,
      'pipe_out': 1,
      'pipe_diff': 0,
      'battery_in': 30,
      'battery_out': 30,
      'battery_diff': 0,
      'postage': true,
      'comment': 'lorem ipsum'
    }, {
      'id': 4,
      'in': '2017-01-05',
      'out': '2017-01-04',
      'box_number': 'H123',
      'partner_name': 'Fodor',
      'partner_number': '49-047-27',
      'pipe_in': 2,
      'pipe_out': 10,
      'pipe_diff': 8,
      'battery_in': 28,
      'battery_out': 30,
      'battery_diff': 2,
      'postage': false,
      'comment': null
    }, {
      'id': 3,
      'in': null,
      'out': '2017-01-03',
      'box_number': 'H123',
      'partner_name': 'Fodor',
      'partner_number': '49-047-27',
      'pipe_in': 0,
      'pipe_out': 1,
      'pipe_diff': 1,
      'battery_in': 0,
      'battery_out': 30,
      'battery_diff': 30,
      'postage': true,
      'comment': 'lorem ipsum'
    }, {
      'id': 2,
      'in': null,
      'out': '2017-01-02',
      'box_number': 'D1212',
      'partner_name': 'Kocsis',
      'partner_number': '61-130-24',
      'pipe_in': 0,
      'pipe_out': 100,
      'pipe_diff': 100,
      'battery_in': 0,
      'battery_out': 5,
      'battery_diff': 5,
      'postage': false,
      'comment': null
    }, {
      'id': 1,
      'in': null,
      'out': '2017-01-01',
      'box_number': 'D12312',
      'partner_name': 'Major ZRT',
      'partner_number': '88-857-15',
      'pipe_in': 0,
      'pipe_out': 10,
      'pipe_diff': 10,
      'battery_in': 0,
      'battery_out': 20,
      'battery_diff': 20,
      'postage': true,
      'comment': null
    }],
    'meta': {'pagination': {'total': 5, 'count': 5, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static boxDetailsResponse = {
    'data': {
      'id': 1,
      'in': null,
      'out': '2017-01-01',
      'box_number': 'D12312',
      'partner_name': 'Major ZRT',
      'partner_number': '88-857-15',
      'pipe_in': 0,
      'pipe_out': 10,
      'pipe_diff': 10,
      'battery_in': 0,
      'battery_out': 20,
      'battery_diff': 20,
      'postage': true,
      'comment': null
    }
  };

  static detailsResponse = {
    'data': {
      'id': 1,
      'number': '70-823-32',
      'registration_number': '71-08-948562',
      'tax_number': '25730728-9-03',
      'name': 'Bogd\u00e1n Kht',
      'postal_code': 965,
      'city': 'H\u00f3dmez\u0151v\u00e1s\u00e1rhely',
      'static_space': 'Istv\u00e1n',
      'static_space_type': 's\u00e9ta\u00fat',
      'house_number': '16',
      'floor_number': '4',
      'door_number': '14',
      'phone': '+36(57)483-340',
      'email': 'armin91@bakos.net',
      'comment': 'Sint occaecati cumque voluptatem molestiae nisi mollitia qui. ',
      'sentable': false,
      'testable': false,
      'modified_at': '2017-02-14 15:46:22',
      'modified_by': null
    }
  };

  static editableUsersResponse = {
    'data': [{
      'id': 1,
      'name': 'Admin admin',
      'email': 'admin@atkft.hu',
      'occupation': 'Superadmin',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 2,
      'name': 'Pag admin',
      'email': 'pagadmin@atkft.hu',
      'occupation': 'Pag admin',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 3,
      'name': 'Takartm\u00e1nytoxin admin',
      'email': 'feedtoxinadmin@atkft.hu',
      'occupation': 'Takartm\u00e1nytoxin admin',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 4,
      'name': 'Tejtoxin admin',
      'email': 'milktoxinadmin@atkft.hu',
      'occupation': 'Tejtoxin admin',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 5,
      'name': 'Mikrobiol\u00f3giai admin',
      'email': 'microbiologyadmin@atkft.hu',
      'occupation': 'Mikrobiol\u00f3giai admin',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 6,
      'name': 'Pag user',
      'email': 'paguser@atkft.hu',
      'occupation': 'Pag user',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 7,
      'name': 'Takartm\u00e1nytoxin user',
      'email': 'feedtoxinuser@atkft.hu',
      'occupation': 'Takartm\u00e1nytoxin user',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 8,
      'name': 'Tejtoxin user',
      'email': 'milktoxinuser@atkft.hu',
      'occupation': 'Tejtoxin user',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }, {
      'id': 9,
      'name': 'Mikrobiol\u00f3giai user',
      'email': 'microbiologyuser@atkft.hu',
      'occupation': 'Mikrobiol\u00f3giai user',
      'active': true,
      'created_at': '2017-03-14 15:04:13',
      'updated_at': '2017-03-14 15:04:13'
    }],
    'meta': {'pagination': {'total': 9, 'count': 9, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static accessDetailsResponse = {
    'data': {
      'id': 1,
      'display_name': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-22 14:00:17',
      'updated_at': '2017-03-22 14:00:17',
      'type': 'access',
      'module': 'microbiology'
    }
  };

  static roleDetailsResponse = {
    'data': {
      'id': 7,
      'display_name': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-22 15:43:30',
      'updated_at': '2017-03-22 15:43:30',
      'type': 'role',
      'module': 'microbiology',
      'name': 'admin'
    }
  };

  static editableUserDetailsResponse = {
    'data': {
      'id': 1,
      'name': 'Admin admin',
      'email': 'admin@atkft.hu',
      'occupation': 'Superadmin',
      'active': true,
      'created_at': '2017-03-16 16:24:01',
      'updated_at': '2017-03-16 16:24:01'
    }
  };

  static contactsResponse = {
    'data': [{
      'id': 115,
      'name': 'Prof. P\u00e1l Johanna',
      'phone': '+36-03-802-3643',
      'email': 'glaszlo@fazekas.com',
      'default': true
    }]
  };

  static contactsResponse2 = {
    'data': [{
      'id': 116,
      'name': 'Prof. P\u00e1l Johanna 2',
      'phone': '+36-03-802-3643',
      'email': 'glaszlo@fazekas.com',
      'default': true
    }]
  };

  static contactDetailsResponse = {
    'data': {
      'id': 24,
      'name': 'Teszt',
      'phone': '123\/456',
      'email': 'exampl@example.org'
    }
  };

  static userRolesResponse = {
    'data': [{
      'id': 7,
      'display_name': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'role',
      'module': 'microbiology',
      'name': 'admin'
    }, {
      'id': 1,
      'display_name': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'access',
      'module': 'microbiology'
    }, {
      'id': 9,
      'display_name': 'PAG admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'PAG admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'role',
      'module': 'pag',
      'name': 'admin'
    }, {
      'id': 2,
      'display_name': 'PAG modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'PAG modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'role',
      'module': 'pag'
    }, {
      'id': 5,
      'display_name': 'Partnert\u00f6rzs modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Partnert\u00f6rzs modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'access',
      'module': 'partner'
    }, {
      'id': 6,
      'display_name': 'Szerv\u00edz modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Szerv\u00edz modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'access',
      'module': 'service'
    }, {
      'id': 11,
      'display_name': 'Takartm\u00e1nytoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Takartm\u00e1nytoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'role',
      'module': 'feedtoxin',
      'name': 'admin'
    }, {
      'id': 3,
      'display_name': 'Takartm\u00e1nytoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Takartm\u00e1nytoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'access',
      'module': 'feedtoxin'
    }, {
      'id': 13,
      'display_name': 'Tejtoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Tejtoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'role',
      'module': 'milktoxin',
      'name': 'admin'
    }, {
      'id': 4,
      'display_name': 'Tejtoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Tejtoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-21 14:42:14',
      'updated_at': '2017-03-21 14:42:14',
      'type': 'access',
      'module': 'milktoxin'
    }]
  };

  static permissionsResponse = {
    'data': [{
      'id': 1,
      'name': 'mikrobiology_function_1',
      'display_name': '1. enged\u00e9ly',
      'description': 'Mikrobiol\u00f3giai modul 1. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 2,
      'name': 'mikrobiology_function_2',
      'display_name': '2. enged\u00e9ly',
      'description': 'Mikrobiol\u00f3giai modul 2. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 3,
      'name': 'mikrobiology_function_3',
      'display_name': '3. enged\u00e9ly',
      'description': 'Mikrobiol\u00f3giai modul 3. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 4,
      'name': 'pag_function_1',
      'display_name': '1. enged\u00e9ly',
      'description': 'PAG modul 1. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 5,
      'name': 'pag_function_2',
      'display_name': '2. enged\u00e9ly',
      'description': 'PAG modul 2. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 6,
      'name': 'pag_function_3',
      'display_name': '3. enged\u00e9ly',
      'description': 'PAG modul 3. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 7,
      'name': 'feedtoxin_function_1',
      'display_name': '1. enged\u00e9ly',
      'description': 'Takartm\u00e1nytoxin modul 1. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 8,
      'name': 'feedtoxin_function_2',
      'display_name': '2. enged\u00e9ly',
      'description': 'Takartm\u00e1nytoxin modul 2. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 9,
      'name': 'feedtoxin_function_3',
      'display_name': '3. enged\u00e9ly',
      'description': 'Takartm\u00e1nytoxin modul 3. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 10,
      'name': 'milktoxin_function_1',
      'display_name': '1. enged\u00e9ly',
      'description': 'Tejtoxin modul 1. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 11,
      'name': 'milktoxin_function_2',
      'display_name': '2. enged\u00e9ly',
      'description': 'Tejtoxin modul 2. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }, {
      'id': 12,
      'name': 'milktoxin_function_3',
      'display_name': '3. enged\u00e9ly',
      'description': 'Tejtoxin modul 3. enged\u00e9ly',
      'created_at': '2017-03-22 15:37:34',
      'updated_at': '2017-03-22 15:37:34'
    }],
    'meta': {'pagination': {'total': 12, 'count': 12, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static payersResponse = {
    'data': [{
      'id': 199,
      'name': 'Orb\u00e1n Kft',
      'address': '5011 \n        B\u00e9k\u00e9scsaba, Jen\u0151 turista\u00fat 68. 3. emelet 48.',
      'phone': '+36580152031',
      'email': 'lborbely@bakos.com',
      'default': true
    }, {
      'id': 174,
      'name': 'Sipos ZRT',
      'address': '4191 Budapest, Farkas liget 29. 3. emelet 14.',
      'phone': '+36711283897',
      'email': 'abakos@simon.com',
      'default': false
    }]
  };

  static accessesResponse = {
    'data': [{
      'id': 1,
      'display_name': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'microbiology'
    }, {
      'id': 2,
      'display_name': 'PAG modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'PAG modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'pag'
    }, {
      'id': 3,
      'display_name': 'Takartm\u00e1nytoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Takartm\u00e1nytoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'feedtoxin'
    }, {
      'id': 4,
      'display_name': 'Tejtoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Tejtoxin modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'milktoxin'
    }, {
      'id': 5,
      'display_name': 'Partnert\u00f6rzs modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Partnert\u00f6rzs modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'partner'
    }, {
      'id': 6,
      'display_name': 'Szerv\u00edz modul hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Szerv\u00edz modul hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-20 13:02:31',
      'updated_at': '2017-03-20 13:02:31',
      'type': 'access',
      'module': 'service'
    }]
    ,
    'meta': {'pagination': {'total': 6, 'count': 6, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static rolesResponse = {
    'data': [{
      'id': 7,
      'display_name': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'microbiology',
      'name': 'admin'
    }, {
      'id': 8,
      'display_name': 'Mikrobiol\u00f3giai user hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Mikrobiol\u00f3giai user hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'microbiology',
      'name': 'user'
    }, {
      'id': 9,
      'display_name': 'PAG admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'PAG admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'pag',
      'name': 'admin'
    }, {
      'id': 10,
      'display_name': 'PAG user hozz\u00e1f\u00e9r\u00e9s',
      'description': 'PAG user hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'pag',
      'name': 'user'
    }, {
      'id': 11,
      'display_name': 'Takartm\u00e1nytoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Takartm\u00e1nytoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'feedtoxin',
      'name': 'admin'
    }, {
      'id': 12,
      'display_name': 'Takartm\u00e1nytoxin user hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Takartm\u00e1nytoxin user hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'feedtoxin',
      'name': 'user'
    }, {
      'id': 13,
      'display_name': 'Tejtoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Tejtoxin admin hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'milktoxin',
      'name': 'admin'
    }, {
      'id': 14,
      'display_name': 'Tejtoxin user hozz\u00e1f\u00e9r\u00e9s',
      'description': 'Tejtoxin user hozz\u00e1f\u00e9r\u00e9s',
      'created_at': '2017-03-16 18:23:31',
      'updated_at': '2017-03-16 18:23:31',
      'type': 'role',
      'module': 'milktoxin',
      'name': 'user'
    }],
    'meta': {'pagination': {'total': 8, 'count': 8, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static contractsResponse = {
    'data': [
      {
        'id': 364,
        'name': 'consequatur consequatur',
        'start': '2012-08-29',
        'end': '2015-08-29',
        'item_numbers': [
          {
            'id': 35,
            'item_number': '1753',
            'name': 'error maxime',
            'price': 1419
          },
          {
            'id': 59,
            'item_number': '2017',
            'name': 'necessitatibus vel',
            'price': 4068
          },
          {
            'id': 79,
            'item_number': '4951',
            'name': 'cupiditate deserunt',
            'price': 4301
          }
        ]
      },
      {
        'id': 361,
        'name': 'dolores omnis',
        'start': '2011-02-19',
        'end': '2014-02-19',
        'item_numbers': [
          {
            'id': 6,
            'item_number': '8517',
            'name': 'maiores laborum',
            'price': 8520
          }, {
            'id': 70,
            'item_number': '4746',
            'name': 'iure quae',
            'price': 8974
          },
          {
            'id': 97,
            'item_number': '8079',
            'name': 'enim aut',
            'price': 5987
          }
        ]
      }
    ]
  };

  static itemNumbersResponse = {
    'data': [{
      'id': 1,
      'item_number': '7730',
      'name': 'minus ipsam',
      'price': 117,
      'comment': 'id quia qui'
    }, {
      'id': 2,
      'item_number': '2982',
      'name': 'non iure',
      'price': 7294,
      'comment': 'harum commodi laborum earum deserunt tenetur quod'
    }, {
      'id': 3,
      'item_number': '1769',
      'name': 'et est',
      'price': 9489,
      'comment': 'voluptatibus quisquam sed qui'
    }, {'id': 4, 'item_number': '4978', 'name': 'autem et', 'price': 5893, 'comment': null}, {
      'id': 5,
      'item_number': '4349',
      'name': 'corrupti dolor',
      'price': 2511,
      'comment': null
    }, {
      'id': 6,
      'item_number': '8517',
      'name': 'maiores laborum',
      'price': 8520,
      'comment': 'commodi facilis nemo voluptas est unde doloribus quia odit enim'
    }, {
      'id': 7,
      'item_number': '8816',
      'name': 'pariatur illo',
      'price': 4780,
      'comment': 'eveniet deleniti atque delectus aut error amet nemo non'
    }, {
      'id': 8,
      'item_number': '4435',
      'name': 'molestiae reiciendis',
      'price': 3464,
      'comment': 'in vel corrupti repellat neque et quia corrupti dolorum'
    }, {
      'id': 9,
      'item_number': '9828',
      'name': 'error ratione',
      'price': 4543,
      'comment': 'odio rerum repellendus beatae ullam'
    }, {
      'id': 10,
      'item_number': '2015',
      'name': 'praesentium aspernatur',
      'price': 7211,
      'comment': 'exercitationem tempora nemo delectus recusandae'
    }, {'id': 11, 'item_number': '6540', 'name': 'quo accusantium', 'price': 7496, 'comment': 'voluptas'}, {
      'id': 12,
      'item_number': '8927',
      'name': 'sapiente dolorem',
      'price': 7789,
      'comment': 'quia modi et fugiat quo animi corrupti ut'
    }, {
      'id': 13,
      'item_number': '3983',
      'name': 'et ut',
      'price': 3413,
      'comment': 'hic nam odio sit dolores'
    }, {
      'id': 14,
      'item_number': '7291',
      'name': 'quia eveniet',
      'price': 5750,
      'comment': 'voluptatem voluptatibus quia optio nisi'
    }, {
      'id': 15,
      'item_number': '0268',
      'name': 'consectetur commodi',
      'price': 5772,
      'comment': 'rerum qui ad harum molestiae sunt minus eos ut in'
    }, {
      'id': 16,
      'item_number': '9280',
      'name': 'quasi ad',
      'price': 8227,
      'comment': 'molestiae quod explicabo consectetur et vel'
    }, {'id': 17, 'item_number': '8339', 'name': 'in numquam', 'price': 6049, 'comment': 'autem'}, {
      'id': 18,
      'item_number': '9563',
      'name': 'quod et',
      'price': 4862,
      'comment': 'eveniet incidunt quisquam dolorum qui'
    }, {
      'id': 19,
      'item_number': '4572',
      'name': 'aut quia',
      'price': 1865,
      'comment': 'optio a fugiat veritatis error illo atque accusantium veniam'
    }, {
      'id': 20,
      'item_number': '5680',
      'name': 'optio provident',
      'price': 3012,
      'comment': 'veritatis voluptas est ut culpa'
    }],
    'meta': {
      'pagination': {
        'total': 100,
        'count': 20,
        'per_page': 20,
        'current_page': 1,
        'total_pages': 5,
        'links': {'next': 'http:\/\/api.atkft.dev.mik.bme.hu\/api\/item-numbers?page=2'}
      }
    }
  };

  static dictionariesResponse = {
    'data': [
      {
        'id': 1,
        'name': 'Takarm\u00e1ny t\u00edpusok',
        'has_comment': true,
        'has_default': false
      },
      {
        'id': 2,
        'name': 'Tejminta t\u00edpusok',
        'has_comment': false,
        'has_default': false
      },
      {
        'id': 3,
        'name': 'Vizsg\u00e1latok',
        'has_comment': true,
        'has_default': true
      },
      {
        'id': 4,
        'name': 'Mintavev\u0151k',
        'has_comment': false,
        'has_default': false
      },
      {
        'id': 5,
        'name': 'Vemhess\u00e9gvizsg\u00e1lat \u00e9rt\u00e9kei',
        'has_comment': false,
        'has_default': true
      },
    ]
  };

  static dictionaryElementsResponse = {
    'data': [{
      'id': 8,
      'code': 1209,
      'name': 'Tarczali Istv\u00e1n',
      'order': 1,
      'comment': null,
      'default': null
    }, {'id': 9, 'code': 1206, 'name': 'M\u00e9sz\u00e1ros G\u00e1bor', 'order': 1, 'comment': null, 'default': null}],
    'meta': {'pagination': {'total': 2, 'count': 2, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static userResponse = {
    'data': {
      'id': 1,
      'name': 'Admin admin',
      'email': 'admin@atkft.hu',
      'modules': {
        'microbiology': ['mikrobiology_function_1', 'mikrobiology_function_2', 'mikrobiology_function_3'],
        'pag': ['pag_function_1', 'pag_function_2', 'pag_function_3'],
        'feedtoxin': ['feedtoxin_function_1', 'feedtoxin_function_2', 'feedtoxin_function_3'],
        'milktoxin': ['milktoxin_function_1', 'milktoxin_function_2', 'milktoxin_function_3'],
        'partner': [],
        'service': []
      }
    }
  };

  static analysisResponse = {
    'data': {
      'id': 1,
      'full_identifier': 'V0004\/2017',
      'central': false,
      'arrival_closed': false,
      'report_generated': false,
      'report_saved': false,
      'report_approved': false,
      'report_sent': false,
      'billed': false,
      'deleted': false
    }
  };

  static arrival1EditResponse = {
    'data': {
      'customerId': 1,
      'customerContactId': 115,
      'resultId': 199,
      'resultEmailIds': [116],
      'payerId': 199
    }
  };

  static arrival2PagEditResponse = {
    'data': {
      'id': 6,
      'name': 'Balogh NyRT',
      'number': '71-907-46',
      'full_identifier': 'V0006\/2017',
      'customer': {'name': 'Balogh NyRT', 'number': '71-907-46'},
      'sentable': false,
      'testable': true,
      'central': null,
      'comment': null,
      'sample_number': 1,
      'dates': {
        'sample_taken_at': '2012-08-29',
        'sample_arrived_at': '2012-08-29',
        'analysis_created_at': null,
        'examined_at': null,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      'sample_type': null,
      'sample_arrival_temperature': null,
      'rows': []
    }
  };

  static arrival2MilktoxinEditResponse = {
    'data': {
      'id': 71,
      'full_identifier': 'TT0001\/2017',
      'customer': {'name': 'Balog', 'number': '35-919-76'},
      'sentable': true,
      'testable': false,
      'comment': null,
      'sample_number': 1,
      'dates': {
        'sample_taken_at': null,
        'sample_arrived_at': null,
        'analysis_created_at': null,
        'examined_at': null,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      'postage': null,
      'sample_type': null,
      'sample_arrival_temperature': null,
      'sample_sent_by': null,
      'analysis_types': null,
      'sample_quantity': null,
      'box_identifier': null,
      'instrument_identifier': null,
      'registration_number': null,
      'supplier': null,
      'milk_litre': null,
      'rows': []
    }
  };

  static arrival2TamponEditResponse = {
    'data': {
      'id': 218,
      'name': 'Lukács NyRT',
      'number': '35-919-76',
      'full_identifier': 'MT0035/2017',
      'customer': {
        'name': 'Lukács NyRT',
        'number': '35-919-76'
      },
      'sentable': true,
      'testable': true,
      'postage': true,
      'comment': 'Lorem ipsum',
      'sample_number': 3,
      'dates': {
        'sample_taken_at': '2017.01.01.',
        'sample_arrived_at': '2017.01.02.',
        'analysis_created_at': '2017.03.24.',
        'examined_at': null,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      'sample_delivery_method': null,
      'rows': [
        {
          'analysis_id': 218,
          'row_id': 1,
          'barcode': null,
          'sample_taken_at': null,
          result_coliforms: null,
          result_e_coli: null,
          result_saprophytes: null,
          result_staph: null,
          'comment': null
        },
        {
          'analysis_id': 218,
          'row_id': 2,
          'barcode': null,
          'sample_taken_at': null,
          result_coliforms: null,
          result_e_coli: null,
          result_saprophytes: null,
          result_staph: null,
          'comment': null
        },
        {
          'analysis_id': 218,
          'row_id': 3,
          'barcode': null,
          'sample_taken_at': null,
          result_coliforms: null,
          result_e_coli: null,
          result_saprophytes: null,
          result_staph: null,
          'comment': null
        }
      ]
    }
  };

  static arrival2MastitisEditResponse = {
    'data': {
      'id': 31,
      'full_identifier': 'MM0031\/2017',
      'customer': {'name': 'Boros 33 ZRt (Mm)', 'number': '68-694-80'},
      'sentable': true,
      'testable': true,
      'postage': true,
      'comment': 'voluptatem minima dolores provident culpa delectus',
      'sample_number': 6,
      'analysis_type': 'Pr - Prototheca kimutat\u00e1s',
      'resistance_testing': true,
      'dates': {
        'sample_taken_at': '2017.03.12.',
        'sample_arrived_at': '2017.03.12.',
        'analysis_created_at': '2017.04.03.',
        'examined_at': null,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      'sample_delivery_method': 'K\u00e9zben, h\u0171tve',
      'rows': [{
        'id': 151,
        'analysis_id': 31,
        'row_id': 1,
        'barcode': '0000000001',
        'identification_number': 'HU1000000',
        'registration_number': '0001',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': true,
        'is_left_rear': false,
        'is_right_front': true,
        'is_right_rear': true,
        'result_left_front': '2+',
        'result_left_rear': null,
        'result_right_front': 'kv',
        'result_right_rear': 'kl',
        'result_pathogens': ['\u00dcres', 'Proteus sp.', 'Staphylococcus aureus', 'Azonos\u00edt\u00e1s alatt'],
        'is_resistance': ['Staphylococcus aureus', '\u00dcres', 'Proteus sp.'],
        'comment': 'magni sed'
      }, {
        'id': 152,
        'analysis_id': 31,
        'row_id': 2,
        'barcode': '0000000002',
        'identification_number': 'HU2000000',
        'registration_number': '0002',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': false,
        'is_left_rear': false,
        'is_right_front': true,
        'is_right_rear': true,
        'result_left_front': null,
        'result_left_rear': null,
        'result_right_front': 'kl',
        'result_right_rear': 'vt',
        'result_pathogens': ['Negat\u00edv (Serratia sp.)'],
        'is_resistance': [],
        'comment': 'magni at aut'
      }, {
        'id': 153,
        'analysis_id': 31,
        'row_id': 3,
        'barcode': '0000000003',
        'identification_number': 'HU3000000',
        'registration_number': '0003',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': true,
        'is_left_rear': false,
        'is_right_front': false,
        'is_right_rear': true,
        'result_left_front': 'kgv',
        'result_left_rear': null,
        'result_right_front': null,
        'result_right_rear': '-',
        'result_pathogens': ['Prototheca sp.', 'Steril'],
        'is_resistance': [],
        'comment': 'eum'
      }, {
        'id': 154,
        'analysis_id': 31,
        'row_id': 4,
        'barcode': '0000000004',
        'identification_number': 'HU4000000',
        'registration_number': '0004',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': false,
        'is_left_rear': false,
        'is_right_front': false,
        'is_right_rear': false,
        'result_left_front': null,
        'result_left_rear': null,
        'result_right_front': null,
        'result_right_rear': null,
        'result_pathogens': ['Negat\u00edv (Enterococcus sp.)', 'Negat\u00edv (Streptococcus agalactiae)', 'Fonalas gomba'],
        'is_resistance': ['Fonalas gomba'],
        'comment': 'itaque accusamus'
      }, {
        'id': 155,
        'analysis_id': 31,
        'row_id': 5,
        'barcode': '0000000004',
        'identification_number': 'HU4000000',
        'registration_number': '0004',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': false,
        'is_left_rear': true,
        'is_right_front': false,
        'is_right_rear': false,
        'result_left_front': null,
        'result_left_rear': 'va',
        'result_right_front': null,
        'result_right_rear': null,
        'result_pathogens': ['Proteus sp.', 'Steril'],
        'is_resistance': ['Proteus sp.'],
        'comment': ''
      }, {
        'id': 156,
        'analysis_id': 31,
        'row_id': 6,
        'barcode': '0000000006',
        'identification_number': 'HU6000000',
        'registration_number': '0006',
        'sample_taken_at': '2017-03-11 00:00:00',
        'is_left_front': false,
        'is_left_rear': false,
        'is_right_front': false,
        'is_right_rear': true,
        'result_left_front': null,
        'result_left_rear': null,
        'result_right_front': null,
        'result_right_rear': 'va',
        'result_pathogens': ['Negat\u00edv (Corynebacterium sp.)'],
        'is_resistance': [],
        'comment': 'et nulla in'
      }]
    }
  };


  static pagListResponse = {
    'data': [
      {
        'id': 1,
        'full_identifier': 'KV0001/2017',
        'number': '32-915-13',
        'name': 'Dobos Kht',
        'sample_taken_at': '2017-03-12 00:00:00',
        'sample_arrived_at': '2017-03-12 00:00:00',
        'analysis_created_at': null,
        'examined_at': null,
        'report_id': 1,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      {
        'id': 2,
        'full_identifier': 'V0002/2017',
        'number': '40-784-88',
        'name': 'Major',
        'sample_taken_at': null,
        'sample_arrived_at': null,
        'analysis_created_at': null,
        'examined_at': false,
        'report_id': 1,
        'report_approved_at': null,
        'report_sent_at': false,
        'billed_at': null
      },
      {
        'id': 3,
        'full_identifier': 'V0003/2017',
        'number': '64-216-17',
        'name': 'Vörös BT',
        'sample_taken_at': null,
        'sample_arrived_at': null,
        'analysis_created_at': null,
        'examined_at': false,
        'report_id': 1,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      {
        'id': 4,
        'full_identifier': 'KV0004/2017',
        'number': '92-286-55',
        'name': 'Szabó és Tsa',
        'sample_taken_at': '2017-03-12 00:00:00',
        'sample_arrived_at': '2017-03-12 00:00:00',
        'analysis_created_at': null,
        'examined_at': null,
        'report_id': 1,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      {
        'id': 5,
        'full_identifier': 'V0005/2017',
        'number': '20-611-75',
        'name': 'Bognár',
        'sample_taken_at': null,
        'sample_arrived_at': null,
        'analysis_created_at': null,
        'examined_at': null,
        'report_id': 1,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      }
    ],
    'meta': {
      'pagination': {
        'total': 5,
        'count': 5,
        'per_page': 20,
        'current_page': 1,
        'total_pages': 1,
        'links': []
      }
    }
  };

  static reportSendResponse = {
    'data': [
      {
        'id': 1,
        'name': 'Szabó Árminné',
        'email': 'marietta78@szabo.com',
        'sent_at': null
      },
      {
        'id': 2,
        'name': 'Katona Liliána PhD',
        'email': 'kelemen.noel@veres.net',
        'sent_at': null
      }
    ]
  };

  static analysisBillingTableResponse = {
    'data': {
      'payer': {
        'name': 'Gulyás Kft',
        'number': '22-114-64'
      },
      'rows': {
        'data': [
          {
            'name': 'Pag vizsgálat',
            'item_number': '123 - asdasgfdsg',
            'quantity': 6,
            'unit_price': 0
          }
        ]
      }
    }
  };

  static analysisBillingItemNumbers = {
    'data': [
      {
        'id': '3033',
        'name': 'voluptatum est',
        'price': 123
      },
      {
        'id': '3613',
        'name': 'ad repellat',
        'price': 123
      },
      {
        'id': '3925',
        'name': 'similique repellendus',
        'price': 123
      },
      {
        'id': '1049',
        'name': 'voluptatem et',
        'price': 123
      }
    ]
  };

  static deliveryMethodsDictionaryResponse = {
    'data': [
      {
        'id': 14,
        'code': '7',
        'name': 'Post\u00e1n, felmelegedve',
        'order': 7,
        'comment': null,
        'default': false
      }, {'id': 13, 'code': '6', 'name': 'K\u00e9zben, fagyasztva', 'order': 6, 'comment': null, 'default': false}, {
        'id': 12,
        'code': '5',
        'name': 'K\u00e9zben, h\u0171tetlen',
        'order': 5,
        'comment': null,
        'default': false
      }, {
        'id': 11, 'code': '4', 'name': 'K\u00e9zben, h\u0171tve', 'order': 4, 'comment': null, 'default': false
      }, {
        'id': 10,
        'code': '3',
        'name': 'Post\u00e1n, fagyasztva',
        'order': 3,
        'comment': null,
        'default': false
      }, {'id': 9, 'code': '2', 'name': 'Post\u00e1n, h\u0171tetlen', 'order': 2, 'comment': null, 'default': false}, {
        'id': 8,
        'code': '1',
        'name': 'Post\u00e1n, h\u0171tve',
        'order': 1,
        'comment': null,
        'default': false
      }], 'meta': {'pagination': {'total': 7, 'count': 7, 'per_page': 20, 'current_page': 1, 'total_pages': 1, 'links': []}}
  };

  static mastitisResultTypes = {
    'data': [{
      'id': 2009,
      'code': '-',
      'name': 'negat\u00edv',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2010, 'code': '+', 'name': 'egykereszt', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2011,
      'code': '2+',
      'name': 'k\u00e9tkereszt',
      'order': 3,
      'comment': null,
      'default': false
    }, {'id': 2012, 'code': '3+', 'name': 'h\u00e1romkereszt', 'order': 4, 'comment': null, 'default': false}, {
      'id': 2013,
      'code': '4+',
      'name': 'n\u00e9gykereszt',
      'order': 5,
      'comment': null,
      'default': false
    }, {'id': 2014, 'code': 'kl', 'name': 'klinikai', 'order': 6, 'comment': null, 'default': false}, {
      'id': 2015,
      'code': 'vt',
      'name': 'v\u00e9res, t\u00far\u00f3s',
      'order': 7,
      'comment': null,
      'default': false
    }, {'id': 2016, 'code': 'v\u00e9', 'name': 'v\u00e9res', 'order': 8, 'comment': null, 'default': false}, {
      'id': 2017,
      'code': 'va',
      'name': 'vak',
      'order': 9,
      'comment': null,
      'default': false
    }, {'id': 2018, 'code': 'kg', 'name': 'klinikai, gennyes', 'order': 10, 'comment': null, 'default': false}, {
      'id': 2019,
      'code': 'kv',
      'name': 'klinikai, v\u00e9res',
      'order': 11,
      'comment': null,
      'default': false
    }, {'id': 2020, 'code': 'kgv', 'name': 'klnikai, gennyes, v\u00e9res', 'order': 12, 'comment': null, 'default': false}, {
      'id': 2021,
      'code': 't',
      'name': 't\u00far\u00f3s',
      'order': 13,
      'comment': null,
      'default': false
    }]
  };

  static mastitisPathogens = {
    'data': [{
      'id': 2022,
      'code': '1',
      'name': 'Acinetobacter sp.',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2023, 'code': '2', 'name': 'Aeromonas sp.', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2024,
      'code': '3',
      'name': 'Bacillus cereus',
      'order': 3,
      'comment': null,
      'default': false
    }, {'id': 2025, 'code': '4', 'name': 'Bacillus sp.', 'order': 4, 'comment': null, 'default': false}, {
      'id': 2026,
      'code': '5',
      'name': 'CNS',
      'order': 5,
      'comment': null,
      'default': false
    }, {'id': 2027, 'code': '6', 'name': 'Corynebacterium sp.', 'order': 6, 'comment': null, 'default': false}, {
      'id': 2028,
      'code': '7',
      'name': 'Enterobacter aerogenes',
      'order': 7,
      'comment': null,
      'default': false
    }, {'id': 2029, 'code': '8', 'name': 'Enterobacter sp.', 'order': 8, 'comment': null, 'default': false}, {
      'id': 2030,
      'code': '9',
      'name': 'Enterococcus sp.',
      'order': 9,
      'comment': null,
      'default': false
    }, {'id': 2031, 'code': '10', 'name': 'Escherichia coli', 'order': 10, 'comment': null, 'default': false}, {
      'id': 2032,
      'code': '11',
      'name': 'Fonalas gomba',
      'order': 11,
      'comment': null,
      'default': false
    }, {'id': 2033, 'code': '12', 'name': 'Klebsiella pneumoniae', 'order': 12, 'comment': null, 'default': false}, {
      'id': 2034,
      'code': '13',
      'name': 'Klebsiella sp.',
      'order': 13,
      'comment': null,
      'default': false
    }, {'id': 2035, 'code': '14', 'name': 'Micrococcus sp.', 'order': 14, 'comment': null, 'default': false}, {
      'id': 2036,
      'code': '15',
      'name': 'Negat\u00edv (Bacillus sp)',
      'order': 15,
      'comment': null,
      'default': false
    }, {'id': 2037, 'code': '16', 'name': 'Negat\u00edv (CNS)', 'order': 16, 'comment': null, 'default': false}, {
      'id': 2038,
      'code': '17',
      'name': 'Negat\u00edv (Corynebacterium sp.)',
      'order': 17,
      'comment': null,
      'default': false
    }, {'id': 2039, 'code': '18', 'name': 'Negat\u00edv (Enterococcus sp.)', 'order': 18, 'comment': null, 'default': false}, {
      'id': 2040,
      'code': '19',
      'name': 'Negat\u00edv (Escherichia coli)',
      'order': 19,
      'comment': null,
      'default': false
    }, {'id': 2041, 'code': '20', 'name': 'Negat\u00edv (Klebsiella sp.)', 'order': 20, 'comment': null, 'default': false}, {
      'id': 2042,
      'code': '21',
      'name': 'Negat\u00edv (Pasteurella sp.)',
      'order': 21,
      'comment': null,
      'default': false
    }, {
      'id': 2043,
      'code': '22',
      'name': 'Negat\u00edv (Pseudomonas aeruginosa)',
      'order': 22,
      'comment': null,
      'default': false
    }, {'id': 2044, 'code': '23', 'name': 'Negat\u00edv (Pseudomonas sp.)', 'order': 23, 'comment': null, 'default': false}, {
      'id': 2045,
      'code': '24',
      'name': 'Negat\u00edv (Sarjadz\u00f3 gomba)',
      'order': 24,
      'comment': null,
      'default': false
    }, {'id': 2046, 'code': '25', 'name': 'Negat\u00edv (Serratia marcescens)', 'order': 25, 'comment': null, 'default': false}, {
      'id': 2047,
      'code': '26',
      'name': 'Negat\u00edv (Serratia sp.)',
      'order': 26,
      'comment': null,
      'default': false
    }, {
      'id': 2048,
      'code': '27',
      'name': 'Negat\u00edv (Streptococcus agalactiae)',
      'order': 27,
      'comment': null,
      'default': false
    }, {
      'id': 2049,
      'code': '28',
      'name': 'Negat\u00edv (Streptococcus dysgalactiae)',
      'order': 28,
      'comment': null,
      'default': false
    }, {'id': 2050, 'code': '29', 'name': 'Negat\u00edv (Streptococcus sp.)', 'order': 29, 'comment': null, 'default': false}, {
      'id': 2051,
      'code': '30',
      'name': 'Negat\u00edv (Streptococcus uberis)',
      'order': 30,
      'comment': null,
      'default': false
    }, {'id': 2052, 'code': '31', 'name': 'Negat\u00edv (Trueperella pyogenes)', 'order': 31, 'comment': null, 'default': false}, {
      'id': 2053,
      'code': '32',
      'name': 'Negat\u00edv(Streptococcus dysgal.\/ssp. Equisimilis)',
      'order': 32,
      'comment': null,
      'default': false
    }, {'id': 2054, 'code': '33', 'name': 'Pasteurella sp.', 'order': 33, 'comment': null, 'default': false}, {
      'id': 2055,
      'code': '34',
      'name': 'Proteus sp.',
      'order': 34,
      'comment': null,
      'default': false
    }, {'id': 2056, 'code': '35', 'name': 'Prototheca sp.', 'order': 35, 'comment': null, 'default': false}, {
      'id': 2057,
      'code': '36',
      'name': 'Pseudomonas aeruginosa',
      'order': 36,
      'comment': null,
      'default': false
    }, {'id': 2058, 'code': '37', 'name': 'Pseudomonas sp.', 'order': 37, 'comment': null, 'default': false}, {
      'id': 2059,
      'code': '38',
      'name': 'Sarjadz\u00f3 gomba',
      'order': 38,
      'comment': null,
      'default': false
    }, {'id': 2060, 'code': '39', 'name': 'Serratia marcescens', 'order': 39, 'comment': null, 'default': false}, {
      'id': 2061,
      'code': '40',
      'name': 'Serratia sp.',
      'order': 40,
      'comment': null,
      'default': false
    }, {'id': 2062, 'code': '41', 'name': 'Staphylococcus aureus', 'order': 41, 'comment': null, 'default': false}, {
      'id': 2063,
      'code': '42',
      'name': 'Streptococcus agalactiae',
      'order': 42,
      'comment': null,
      'default': false
    }, {'id': 2064, 'code': '43', 'name': 'Streptococcus bovis', 'order': 43, 'comment': null, 'default': false}, {
      'id': 2065,
      'code': '44',
      'name': 'Streptococcus canis',
      'order': 44,
      'comment': null,
      'default': false
    }, {
      'id': 2066,
      'code': '45',
      'name': 'Streptococcus dysg.\/ssp equisimilis',
      'order': 45,
      'comment': null,
      'default': false
    }, {'id': 2067, 'code': '46', 'name': 'Streptococcus dysgalactiae', 'order': 46, 'comment': null, 'default': false}, {
      'id': 2068,
      'code': '47',
      'name': 'Streptococcus sp.',
      'order': 47,
      'comment': null,
      'default': false
    }, {'id': 2069, 'code': '48', 'name': 'Streptococcus uberis', 'order': 48, 'comment': null, 'default': false}, {
      'id': 2070,
      'code': '49',
      'name': 'Trueperella pyogenes',
      'order': 49,
      'comment': null,
      'default': false
    }, {
      'id': 2071,
      'code': '50',
      'name': 'Gram-negat\u00edv k\u00f3rokoz\u00f3',
      'order': 50,
      'comment': null,
      'default': false
    }, {'id': 2072, 'code': '51', 'name': 'Steril', 'order': 51, 'comment': null, 'default': false}, {
      'id': 2073,
      'code': '52',
      'name': 'Szennyezett',
      'order': 52,
      'comment': null,
      'default': false
    }, {'id': 2074, 'code': '53', 'name': '\u00dcres', 'order': 53, 'comment': null, 'default': false}, {
      'id': 2075,
      'code': '54',
      'name': 'Hi\u00e1nyzik',
      'order': 54,
      'comment': null,
      'default': false
    }, {'id': 2076, 'code': '55', 'name': 'Azonos\u00edt\u00e1s alatt', 'order': 55, 'comment': null, 'default': false}, {
      'id': 2077,
      'code': '56',
      'name': 'Azonos\u00edthatatlan sz\u00e1m',
      'order': 56,
      'comment': null,
      'default': false
    }, {'id': 2078, 'code': '57', 'name': 'Jelz\u00e9s n\u00e9lk\u00fcli cs\u0151', 'order': 57, 'comment': null, 'default': false}]
  };

  static mastitisAntibioticsResistance = {
    'data': [{
      'id': 2022,
      'code': '1',
      'name': 'Acinetobacter sp.',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2023, 'code': '2', 'name': 'Aeromonas sp.', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2024,
      'code': '3',
      'name': 'Bacillus cereus',
      'order': 3,
      'comment': null,
      'default': false
    }, {'id': 2025, 'code': '4', 'name': 'Bacillus sp.', 'order': 4, 'comment': null, 'default': false}, {
      'id': 2026,
      'code': '5',
      'name': 'CNS',
      'order': 5,
      'comment': null,
      'default': false
    }, {'id': 2027, 'code': '6', 'name': 'Corynebacterium sp.', 'order': 6, 'comment': null, 'default': false}, {
      'id': 2028,
      'code': '7',
      'name': 'Enterobacter aerogenes',
      'order': 7,
      'comment': null,
      'default': false
    }, {'id': 2029, 'code': '8', 'name': 'Enterobacter sp.', 'order': 8, 'comment': null, 'default': false}, {
      'id': 2030,
      'code': '9',
      'name': 'Enterococcus sp.',
      'order': 9,
      'comment': null,
      'default': false
    }, {'id': 2031, 'code': '10', 'name': 'Escherichia coli', 'order': 10, 'comment': null, 'default': false}, {
      'id': 2032,
      'code': '11',
      'name': 'Fonalas gomba',
      'order': 11,
      'comment': null,
      'default': false
    }, {'id': 2033, 'code': '12', 'name': 'Klebsiella pneumoniae', 'order': 12, 'comment': null, 'default': false}, {
      'id': 2034,
      'code': '13',
      'name': 'Klebsiella sp.',
      'order': 13,
      'comment': null,
      'default': false
    }, {'id': 2035, 'code': '14', 'name': 'Micrococcus sp.', 'order': 14, 'comment': null, 'default': false}, {
      'id': 2036,
      'code': '15',
      'name': 'Negat\u00edv (Bacillus sp)',
      'order': 15,
      'comment': null,
      'default': false
    }, {'id': 2037, 'code': '16', 'name': 'Negat\u00edv (CNS)', 'order': 16, 'comment': null, 'default': false}, {
      'id': 2038,
      'code': '17',
      'name': 'Negat\u00edv (Corynebacterium sp.)',
      'order': 17,
      'comment': null,
      'default': false
    }, {'id': 2039, 'code': '18', 'name': 'Negat\u00edv (Enterococcus sp.)', 'order': 18, 'comment': null, 'default': false}, {
      'id': 2040,
      'code': '19',
      'name': 'Negat\u00edv (Escherichia coli)',
      'order': 19,
      'comment': null,
      'default': false
    }, {'id': 2041, 'code': '20', 'name': 'Negat\u00edv (Klebsiella sp.)', 'order': 20, 'comment': null, 'default': false}, {
      'id': 2042,
      'code': '21',
      'name': 'Negat\u00edv (Pasteurella sp.)',
      'order': 21,
      'comment': null,
      'default': false
    }, {
      'id': 2043,
      'code': '22',
      'name': 'Negat\u00edv (Pseudomonas aeruginosa)',
      'order': 22,
      'comment': null,
      'default': false
    }, {'id': 2044, 'code': '23', 'name': 'Negat\u00edv (Pseudomonas sp.)', 'order': 23, 'comment': null, 'default': false}, {
      'id': 2045,
      'code': '24',
      'name': 'Negat\u00edv (Sarjadz\u00f3 gomba)',
      'order': 24,
      'comment': null,
      'default': false
    }, {'id': 2046, 'code': '25', 'name': 'Negat\u00edv (Serratia marcescens)', 'order': 25, 'comment': null, 'default': false}, {
      'id': 2047,
      'code': '26',
      'name': 'Negat\u00edv (Serratia sp.)',
      'order': 26,
      'comment': null,
      'default': false
    }, {
      'id': 2048,
      'code': '27',
      'name': 'Negat\u00edv (Streptococcus agalactiae)',
      'order': 27,
      'comment': null,
      'default': false
    }, {
      'id': 2049,
      'code': '28',
      'name': 'Negat\u00edv (Streptococcus dysgalactiae)',
      'order': 28,
      'comment': null,
      'default': false
    }, {'id': 2050, 'code': '29', 'name': 'Negat\u00edv (Streptococcus sp.)', 'order': 29, 'comment': null, 'default': false}, {
      'id': 2051,
      'code': '30',
      'name': 'Negat\u00edv (Streptococcus uberis)',
      'order': 30,
      'comment': null,
      'default': false
    }, {'id': 2052, 'code': '31', 'name': 'Negat\u00edv (Trueperella pyogenes)', 'order': 31, 'comment': null, 'default': false}, {
      'id': 2053,
      'code': '32',
      'name': 'Negat\u00edv(Streptococcus dysgal.\/ssp. Equisimilis)',
      'order': 32,
      'comment': null,
      'default': false
    }, {'id': 2054, 'code': '33', 'name': 'Pasteurella sp.', 'order': 33, 'comment': null, 'default': false}, {
      'id': 2055,
      'code': '34',
      'name': 'Proteus sp.',
      'order': 34,
      'comment': null,
      'default': false
    }, {'id': 2056, 'code': '35', 'name': 'Prototheca sp.', 'order': 35, 'comment': null, 'default': false}, {
      'id': 2057,
      'code': '36',
      'name': 'Pseudomonas aeruginosa',
      'order': 36,
      'comment': null,
      'default': false
    }, {'id': 2058, 'code': '37', 'name': 'Pseudomonas sp.', 'order': 37, 'comment': null, 'default': false}, {
      'id': 2059,
      'code': '38',
      'name': 'Sarjadz\u00f3 gomba',
      'order': 38,
      'comment': null,
      'default': false
    }, {'id': 2060, 'code': '39', 'name': 'Serratia marcescens', 'order': 39, 'comment': null, 'default': false}, {
      'id': 2061,
      'code': '40',
      'name': 'Serratia sp.',
      'order': 40,
      'comment': null,
      'default': false
    }, {'id': 2062, 'code': '41', 'name': 'Staphylococcus aureus', 'order': 41, 'comment': null, 'default': false}, {
      'id': 2063,
      'code': '42',
      'name': 'Streptococcus agalactiae',
      'order': 42,
      'comment': null,
      'default': false
    }, {'id': 2064, 'code': '43', 'name': 'Streptococcus bovis', 'order': 43, 'comment': null, 'default': false}, {
      'id': 2065,
      'code': '44',
      'name': 'Streptococcus canis',
      'order': 44,
      'comment': null,
      'default': false
    }, {
      'id': 2066,
      'code': '45',
      'name': 'Streptococcus dysg.\/ssp equisimilis',
      'order': 45,
      'comment': null,
      'default': false
    }, {'id': 2067, 'code': '46', 'name': 'Streptococcus dysgalactiae', 'order': 46, 'comment': null, 'default': false}, {
      'id': 2068,
      'code': '47',
      'name': 'Streptococcus sp.',
      'order': 47,
      'comment': null,
      'default': false
    }, {'id': 2069, 'code': '48', 'name': 'Streptococcus uberis', 'order': 48, 'comment': null, 'default': false}, {
      'id': 2070,
      'code': '49',
      'name': 'Trueperella pyogenes',
      'order': 49,
      'comment': null,
      'default': false
    }, {
      'id': 2071,
      'code': '50',
      'name': 'Gram-negat\u00edv k\u00f3rokoz\u00f3',
      'order': 50,
      'comment': null,
      'default': false
    }, {'id': 2072, 'code': '51', 'name': 'Steril', 'order': 51, 'comment': null, 'default': false}, {
      'id': 2073,
      'code': '52',
      'name': 'Szennyezett',
      'order': 52,
      'comment': null,
      'default': false
    }, {'id': 2074, 'code': '53', 'name': '\u00dcres', 'order': 53, 'comment': null, 'default': false}, {
      'id': 2075,
      'code': '54',
      'name': 'Hi\u00e1nyzik',
      'order': 54,
      'comment': null,
      'default': false
    }, {'id': 2076, 'code': '55', 'name': 'Azonos\u00edt\u00e1s alatt', 'order': 55, 'comment': null, 'default': false}, {
      'id': 2077,
      'code': '56',
      'name': 'Azonos\u00edthatatlan sz\u00e1m',
      'order': 56,
      'comment': null,
      'default': false
    }, {'id': 2078, 'code': '57', 'name': 'Jelz\u00e9s n\u00e9lk\u00fcli cs\u0151', 'order': 57, 'comment': null, 'default': false}]
  };

  static mastitisResistanceTypes = {
    'data': [{
      'id': 2112,
      'code': '\u00c9',
      'name': '\u00e9rz\u00e9keny',
      'order': 1,
      'comment': null,
      'default': false
    }, {
      'id': 2113,
      'code': 'M\u00c9',
      'name': 'm\u00e9rs\u00e9kelten \u00e9rz\u00e9keny',
      'order': 2,
      'comment': null,
      'default': false
    }, {'id': 2114, 'code': 'R', 'name': 'rezisztens', 'order': 3, 'comment': null, 'default': false}, {
      'id': 2115,
      'code': '-',
      'name': 'negat\u00edv',
      'order': 4,
      'comment': null,
      'default': false
    }]
  };

  static mastitisAnalysisTypes = {
    'data': [{
      'id': 1995,
      'code': 'T',
      'name': 'Teljes k\u00f6r\u0171',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 1996, 'code': 'S', 'name': 'Staphylococcus aureus kimutat\u00e1s', 'order': 2, 'comment': null, 'default': false}, {
      'id': 1997,
      'code': '\u00d6',
      'name': '\u00d6sszcs\u00edrasz\u00e1m meghat\u00e1roz\u00e1s',
      'order': 3,
      'comment': null,
      'default': false
    }, {
      'id': 1998,
      'code': 'St',
      'name': 'Staph. aureus sz\u00e1mmeghat\u00e1roz\u00e1s',
      'order': 4,
      'comment': null,
      'default': false
    }, {'id': 1999, 'code': 'R', 'name': 'Rezisztencia', 'order': 5, 'comment': null, 'default': false}, {
      'id': 2000,
      'code': 'EC',
      'name': 'E.coli sz\u00e1m meghat\u00e1roz\u00e1s',
      'order': 6,
      'comment': null,
      'default': false
    }, {
      'id': 2001,
      'code': 'Ek',
      'name': 'Enterococcus sz\u00e1m meghat\u00e1roz\u00e1s',
      'order': 7,
      'comment': null,
      'default': false
    }, {'id': 2002, 'code': 'Pr', 'name': 'Prototheca kimutat\u00e1s', 'order': 8, 'comment': null, 'default': false}, {
      'id': 2003,
      'code': 'PA',
      'name': 'Prototh. , St.aureus sz\u0171r\u00e9s',
      'order': 9,
      'comment': null,
      'default': false
    }, {'id': 2004, 'code': 'AT', 'name': 'Alf\u00f6ldi Teljesk\u00f6r\u0171', 'order': 10, 'comment': null, 'default': false}, {
      'id': 2005,
      'code': 'AR',
      'name': 'Alf\u00f6ldi Rezisztencia',
      'order': 11,
      'comment': null,
      'default': false
    }, {
      'id': 2006,
      'code': 'AS',
      'name': 'Alf\u00f6ldi Staph aureus kimutat\u00e1s',
      'order': 12,
      'comment': null,
      'default': false
    }, {'id': 2007, 'code': 'AP', 'name': 'Alf\u00f6ldi Prototheca', 'order': 13, 'comment': null, 'default': false}, {
      'id': 2008,
      'code': 'ASP',
      'name': 'Alf\u00f6ldi Staph aureus + prototheca',
      'order': 14,
      'comment': null,
      'default': false
    }]
  };

  static arrival2FeedtoxinEditResponse = {
    'data': {
      'id': 131,
      'full_identifier': 'TT0027\/2017',
      'customer': {'name': 'H\u00f3dmez\u0151gazda Zrt.', 'number': '05-604-21'},
      'sentable': true,
      'testable': true,
      'comment': 'non quod quae cum sed autem quis necessitatibus',
      'production_controller': 'Bokros Hubert',
      'sample_number': 4,
      'dates': {
        'sample_taken_at': '2017.03.12.',
        'sample_arrived_at': '2017.03.12.',
        'analysis_created_at': null,
        'examined_at': null,
        'report_approved_at': null,
        'report_sent_at': null,
        'billed_at': null
      },
      'sample_taken_by': 'Saj\u00e1t mintav\u00e9tel',
      'sample_sent_by': 'Pethes Csaba',
      'analysis_types': ['Toxin 4'],
      'forage_type': 'Nedves',
      'sample_type': '\u00e1rpadara',
      'barcode': '1234567890',
      'unique_identifier': '4',
      'material_predry': null,
      'material_dry_average': null,
      'material_dry_absolute': null,
      'rows': [{
        'id': 97,
        'analysis_id': 131,
        'row_id': 1,
        'toxin_name': null,
        'analysis_type': null,
        'result': null,
        'result_with_limit': null,
        'result_original': null,
        'result_12': null,
        'result_absolute': null,
        'comment': null,
        'results': []
      }, {
        'id': 98,
        'analysis_id': 131,
        'row_id': 2,
        'toxin_name': null,
        'analysis_type': null,
        'result': null,
        'result_with_limit': null,
        'result_original': null,
        'result_12': null,
        'result_absolute': null,
        'comment': null,
        'results': []
      }, {
        'id': 139,
        'analysis_id': 131,
        'row_id': 3,
        'toxin_name': null,
        'analysis_type': null,
        'result': null,
        'result_with_limit': null,
        'result_original': null,
        'result_12': null,
        'result_absolute': null,
        'comment': null,
        'results': []
      }, {
        'id': 144,
        'analysis_id': 131,
        'row_id': 4,
        'toxin_name': null,
        'analysis_type': null,
        'result': null,
        'result_with_limit': null,
        'result_original': null,
        'result_12': null,
        'result_absolute': null,
        'comment': null,
        'results': []
      }]
    }
  };

  static feedtoxinSampleTakenBy = {
    'data': [{
      'id': 2120,
      'code': '9999',
      'name': 'Saj\u00e1t mintav\u00e9tel',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2121, 'code': '0108', 'name': 'Pethes Csaba', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2122,
      'code': '0205',
      'name': 'Kozla J\u00e1nos',
      'order': 3,
      'comment': null,
      'default': false
    }]
  };

  static feedtoxinSampleSentBy = {
    'data': [{
      'id': 2123,
      'code': '9999',
      'name': 'Saj\u00e1t mintav\u00e9tel',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2124, 'code': '0108', 'name': 'Pethes Csaba', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2125,
      'code': '0205',
      'name': 'Kozla J\u00e1nos',
      'order': 3,
      'comment': null,
      'default': false
    }]
  };

  static feedtoxinSampleTypes = {
    'data': [{
      'id': 2126,
      'code': '1',
      'name': 'kukorica, szil\u00e1zs',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 2127, 'code': '2', 'name': 'szemes b\u00faza', 'order': 2, 'comment': null, 'default': false}, {
      'id': 2128,
      'code': '3',
      'name': '\u00e1rpadara',
      'order': 3,
      'comment': null,
      'default': false
    }]
  };

  static responses = {
    'partners': TestData.partnersResponse,
    'partners/1': TestData.detailsResponse,
    'partners/1/contacts': TestData.contactsResponse,
    'partners/1/payers': TestData.payersResponse,
    'partners/1/results': TestData.payersResponse,
    'partners/1/contracts': TestData.contractsResponse,
    'item-numbers': TestData.itemNumbersResponse,
    'dictionaries': TestData.dictionariesResponse,
    'dictionaries/1': TestData.dictionaryElementsResponse,
    'dictionaries/1?sort=name': TestData.dictionaryElementsResponse,
    'dictionaries/4': TestData.deliveryMethodsDictionaryResponse,
    'dictionaries/12?sort=name': TestData.mastitisAnalysisTypes,
    'dictionaries/13?sort=name': TestData.mastitisResultTypes,
    'dictionaries/14?sort=name': TestData.mastitisPathogens,
    'dictionaries/15?sort=name': TestData.mastitisAntibioticsResistance,
    'dictionaries/16?sort=name': TestData.mastitisResistanceTypes,
    'dictionaries/17?sort=name': TestData.feedtoxinSampleTakenBy,
    'dictionaries/18?sort=name': TestData.feedtoxinSampleSentBy,
    'dictionaries/19?sort=name': TestData.feedtoxinSampleTypes,
    'pag/1': TestData.analysisResponse,
    'pag/1/arrival1/edit': TestData.arrival1EditResponse,
    'pag/1/arrival2/edit': TestData.arrival2PagEditResponse,
    'pag': TestData.pagListResponse,
    'pag/1/report/send': TestData.reportSendResponse,
    'pag/1/billing': TestData.analysisBillingTableResponse,
    'pag/1/billing/item-numbers': TestData.analysisBillingItemNumbers,
    'tampon/1/arrival2/edit': TestData.arrival2TamponEditResponse,
    'mastitis/1/arrival2/edit': TestData.arrival2MastitisEditResponse,
    'feedtoxin/1/arrival2/edit': TestData.arrival2FeedtoxinEditResponse,
    'users/list': TestData.editableUsersResponse,
    'users/1': TestData.editableUserDetailsResponse,
    'users/1/roles': TestData.userRolesResponse,
    'roles/list/role': TestData.rolesResponse,
    'roles/list/access': TestData.accessesResponse,
    'roles/list/permission': TestData.permissionsResponse,
    'roles/1': TestData.accessDetailsResponse,
    'roles/7': TestData.roleDetailsResponse,
    'pag-boxes': TestData.boxesResponse,
    'pag-boxes/1': TestData.boxDetailsResponse,
    'boxes': TestData.boxesResponse,
    'boxes/1': TestData.boxDetailsResponse,
    'contacts/1': TestData.contactDetailsResponse
  };

}

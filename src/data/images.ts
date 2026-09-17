const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  tower: u('photo-1486406146926-c627a92ad1ab'),
  towerAlt: u('photo-1486401899868-0e435ed85128'),
  facade: u('photo-1460317442991-0ec209397118'),
  lowAngle: u('photo-1531834685032-c34bf0d84c77'),
  glass: u('photo-1494145904049-0dca59b4bbad'),
  towerUp: u('photo-1429497419816-9ca5cfb4571a'),
  building: u('photo-1487958449943-2429e8be8625'),
  skyline: u('photo-1480714378408-67cf0d13bc1b'),
  skylineNight: u('photo-1477959858617-67f85cf4f1df'),
  officeExt: u('photo-1431576901776-e539bd916ba2'),
  officeStand: u('photo-1486325212027-8081e485255e'),
  officeEmpty: u('photo-1497366216548-37526070297c'),
  officeLobby: u('photo-1497366811353-6870744d04b2'),
  officeMeeting: u('photo-1524758631624-e2822e304c36'),
  workspace: u('photo-1504384308090-c894fdcc538d'),
  corridor: u('photo-1504308094386-b38dd1a5e002'),
  warehouse: u('photo-1586528116311-ad8dd3c8310d'),
  warehouseBoxes: u('photo-1566576721346-d4a3b4eaeb55'),
  warehouseAisle: u('photo-1553413077-190dd305871c'),
  logistics: u('photo-1554469384-e58fac16e23a'),
  retail: u('photo-1441986300917-64674bd600d8'),
  retailStreet: u('photo-1441984904996-e0b6ba687e04'),
  retailModern: u('photo-1555529669-e69e7aa0ba9a'),
  dataCenter: u('photo-1558494949-ef010cbdcc31'),
  dataCenterWide: u('photo-1544197150-b99a580bb7a8'),
  campus: u('photo-1545324418-cc1a3fa10c00'),
  outskirts: u('photo-1479839672679-a46483c0e7c8'),
  aerial: u('photo-1521791055366-0d553872125f'),
  skyAerial: u('photo-1449824913935-59a10b8d2000'),
  hotel: u('photo-1566073771259-6a8506099945'),
  glassCorners: u('photo-1439420512658-3f8fcbf5e8b4'),
} as const

export type ImageKey = keyof typeof IMAGES
"use strict";

var fs = require("fs");
var parse = require("csv-parse");
var Promise = require("promise");

var ROOT_PATH = "./data/";
var files = fs.readdirSync(ROOT_PATH);

var uniqueAirports = {};
var uniqueCompanies = {};


var sequence = Promise.resolve();

files.forEach (function (file) {
  sequence = sequence.then(function() {
    return parseFile(file);
  });
});

sequence.then(function() {
  Object.keys(airportsHash).forEach(function (airport) {
    airportsHash[airport].destinations = Object.keys(airportsHash[airport].destinations) || [];
  });
  fs.writeFileSync("output.json", JSON.stringify(airportsHash));
});

function parseFile(fileName) {
  return new Promise(function (success, fail) {
    readFile(fileName).then(parseData).then(function() {
      success();
    })
  });
}

function insertUniqueCompany(company) {
  if (!uniqueCompanies[company]) {
    uniqueCompanies[company] = true;
  }
}

function insertUniqueAirport(airport) {
  if (!uniqueAirports[airport]) {
    uniqueAirports[airport] = true;
  }

  if (!airportIndexMap[airport]) {
    console.log(airport);
  }
}

function readFile(fileName) {
  return new Promise(function (success, fail) {
    fs.readFile(ROOT_PATH + fileName, function (err, data) {
      success([fileName, data.toString()]);
    });
  });
}

function parseData() {
  var fileName = arguments[0][0];
  var data = arguments[0][1];

  return new Promise(function (success, fail) {
    parse(data, {}, function (err, output) {
      if (err) {
        console.log(err);
        fail();
      }
      else {
        var departureIndex = parseInt(fileName.replace(/\.csv/, ""));
        var departure = airports[departureIndex];
        airportsHash[departure] = {
          id: departureIndex,
          destinations: {}
        };

        output.forEach(function (line) {
          // insertUniqueCompany(departure, line[1].trim());
          // insertUniqueAirport(line[3].trim());

          //console.log(line[3].trim());
          var destination = airports[airportIndexMap[line[3].trim()]];
          if (!destination) {
            console.log(destination, line[3].trim());
            console.log(airportIndexMap[line[3].trim()])
          }

          if(!airportsHash[departure].destinations[destination]) {
            airportsHash[departure].destinations[destination] = true;
          }
        });

        success();
      }
    });
  });
}

var airportIndexMap = {};
airportIndexMap['ADANA'] = 7;
airportIndexMap['ADANA SAKIRPA'] = 7;
airportIndexMap['Adana'] = 7;
airportIndexMap['ADIYAMAN'] = 13;
airportIndexMap['ALANYA GAZİPASA'] = 42;
airportIndexMap['AMASYA'] = 15;
airportIndexMap['ANKARA'] = 2;
airportIndexMap['Ankara'] = 2;
airportIndexMap['ESENBOGA'] = 2;
airportIndexMap['ANTALYA'] = 4;
airportIndexMap['Antalya'] = 4;
airportIndexMap['ATATURK'] = 1;
airportIndexMap['AĞRI'] = 14;
airportIndexMap['BALIKESİR'] = 16;
airportIndexMap['BODRUM'] = 6;
airportIndexMap['Bodrum'] = 6;
airportIndexMap['BURSA'] = 18;
airportIndexMap['Yenisehir'] = 18;
airportIndexMap['BİNGÖL'] = 47;
airportIndexMap['DALAMAN'] = 5;
airportIndexMap['DENİZLİ'] = 20;
airportIndexMap['DİYARBAKIR'] = 21;
airportIndexMap['ELAZIĞ'] = 22;
airportIndexMap['ERZURUM'] = 11;
airportIndexMap['ERZİNCAN'] = 23;
airportIndexMap['GAZİANTEP'] = 12;
airportIndexMap['HAKKARI'] = 55;
airportIndexMap['HATAY'] = 24;
airportIndexMap['IST-ATATURK'] = 1;
airportIndexMap['IST-S.GOKCEN'] = 999;
airportIndexMap['IST. - ATATURK'] = 1;
airportIndexMap['IST. - S. GOKCEN'] = 999;
airportIndexMap['ISTANBUL'] = 1;
airportIndexMap['ISTANBUL ATATÜRK'] = 1;
airportIndexMap['IZMIR'] = 3;
airportIndexMap['Ist-Ataturk'] = 1;
airportIndexMap['Ist-S.Gokcen'] = 999;
airportIndexMap['Istanbul'] = 1;
airportIndexMap['Istanbul / Atatürk'] = 1;
airportIndexMap['Istanbul / S. Gökçen'] = 999;
airportIndexMap['Istanbul S.Gokcen'] = 999;
airportIndexMap['Istanbul-Ataturk'] = 1;
airportIndexMap['Istanbul-Atatürk'] = 1;
airportIndexMap['Istanbul-Sabiha Gökçen'] = 999;
airportIndexMap['Izmir'] = 3;
airportIndexMap['IĞDIR'] = 46;
airportIndexMap['KAHRAMANMARAŞ'] = 25;
airportIndexMap['KARS'] = 26;
airportIndexMap['KAYSERİ'] = 27;
airportIndexMap['KONYA'] = 28;
airportIndexMap['Kocaeli'] = 45;
airportIndexMap['MALATYA'] = 29;
airportIndexMap['MARDİN'] = 30;
airportIndexMap['MUŞ'] = 31;
airportIndexMap['NEVŞEHİR'] = 10;
airportIndexMap['ORDU-GİRESUN'] = 54;
airportIndexMap['S.GOKCEN'] = 999;
airportIndexMap['SABIHA GOKCEN'] = 999;
airportIndexMap['SABİHA GOKCEN'] = 999;
airportIndexMap['SABİHA GÖKÇEN'] = 999;
airportIndexMap['SAMSUN'] = 32;
airportIndexMap['SINOP'] = 34;
airportIndexMap['SİVAS'] = 35;
airportIndexMap['SİİRT'] = 33;
airportIndexMap['TRABZON'] = 8;
airportIndexMap['Trabzon'] = 8;
airportIndexMap['VAN'] = 40;
airportIndexMap['Van'] = 40;
airportIndexMap['ZAFER BÖLGESEL'] = 48;
airportIndexMap['ÇANAKKALE'] = 19;
airportIndexMap['ÇORLU'] = 37;
airportIndexMap['İSTANBUL'] = 1;
airportIndexMap['İSTANBUL-SAW'] = 999;
airportIndexMap['İZMİR'] = 3;
airportIndexMap['İstanbul / Atatürk'] = 1;
airportIndexMap['İstanbul / S. Gökçen'] = 999;
airportIndexMap['ŞANLIURFA'] = 36;
airportIndexMap['ŞIRNAK'] = 50;


var airports = [];
airports[7] = "Adana Havalimanı";
airports[2] = "Ankara Esenboğa Havalimanı";
airports[4] = "Antalya Havalimanı";
airports[11] = "Erzurum Havalimanı";
airports[12] = "Gaziantep Havalimanı";
airports[9] = "Isparta Suleyman Demirel Havalimanı";
airports[1] = "İstanbul Atatürk Havalimanı";
airports[3] = "İzmir Adnan Menderes Havalimanı";
airports[5] = "Muğla Dalaman Havalimanı";
airports[6] = "Muğla Milas - Bodrum Havalimanı";
airports[10] = "Kapadokya Havalimanı";
airports[8] = "Trabzon Havalimanı";
airports[13] = "Adıyaman Havalimanı";
airports[42] = "Antalya Gazipaşa - Alanya Havalimanı";
airports[44] = "Batman Havalimanı";
airports[47] = "Bingöl Havalimanı";
airports[18] = "Bursa Yenişehir Havalimanı";
airports[20] = "Denizli Çardak Havalimanı";
airports[21] = "Diyarbakır Havalimanı";
airports[22] = "Elazığ Havalimanı";
airports[23] = "Erzincan Havalimanı";
airports[24] = "Hatay Havalimanı";
airports[46] = "Iğdır Havalimanı";
airports[26] = "Kars Harakani Havalimanı";
airports[49] = "Kastamonu Havalimanı";
airports[27] = "Kayseri Havalimanı";
airports[45] = "Kocaeli Cengiz Topel Havalimanı";
airports[28] = "Konya Havalimanı";
airports[29] = "Malatya Havalimanı";
airports[32] = "Samsun Çarşamba Havalimanı";
airports[35] = "Sivas Nuri Demirağ Havalimanı";
airports[36] = "Şanlıurfa Gap Havalimanı";
airports[50] = "Şırnak Şerafettin Elçi Havalimanı";
airports[999] = "İstanbul Sabiha Gökçen Havalimanı";
airports[37] = "Tekirdağ Çorlu Havalimanı";
airports[40] = "Van Ferit Melen Havalimanı";
airports[48] = "Zafer Havalimanı";
airports[15] = "Amasya Merzifon Havalimanı";
airports[30] = "Mardin Havalimanı";
airports[16] = "Balıkesir Koca Seyit Havalimanı";
airports[25] = "Kahramanmaraş Havalimanı";
airports[55] = "Hakkari Yüksekova Selahaddin Eyyubi Havalimanı";
airports[34] = "Sinop Havalimanı";
airports[14] = "Ağrı Ahmed-i Hani Havalimanı";
airports[33] = "Siirt Havalimanı";
airports[31] = "Muş Havalimanı";
airports[54] = "Ordu Giresun Havalimanı";
airports[19] = "Çanakkale Havalimanı"
var airportsHash = {};

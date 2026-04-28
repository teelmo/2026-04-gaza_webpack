import React, { /* useState, */useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';
import Image from './components/Image.jsx';
import Visualisation from './components/Visualisation.jsx';
import Visualisation2 from './components/Visualisation2.jsx';
import Video from './components/Video.jsx';
import Mosaic from './components/Mosaic.jsx';

// const appID = '#app-root-2026-04-gaza_webpack';

function App() {
  // Data states.
  // const [data, setData] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <div className="app">
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #fff, #eee)' }}>
        <div className="text_content text_dark">
          <h1>Hoitoa ei turvaa</h1>
          <p>Gazan terveydenhuolto on romahtanut, ja kymmenet tuhannet lapset ovat haavoittuneet. Jordania tarjoaa lapsille hoidon, mutta edessä on paluu kotiin, jota ei ole enää olemassa.</p>
          <p>Neljävuotias Rital Abu Asi makaa hotellihuoneen sängyllä. Hänen jalkansa näyttää siltä kuin se olisi valettu sulasta vahasta, joka on jähmettynyt kesken valumisen. Ihosta on tullut paksua, kireää arpikudosta, joka kuroo yhteen reiden ja pohkeen välisen matkan.</p>
          <p>Tytön äiti Riham Abu Asi levittää hitaasti vaseliinia arpikudoksen päälle.</p>
          <p>– En raapinut itseäni aamulla, Rital vakuuttaa hänelle.</p>
        </div>
      </div>
      <Image path="assets/img/Rital_Abu_Asi.jpg" alt="Kuvateksti" background="linear-gradient(to bottom, #eee, #333)" />
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #333, #111)' }}>
        <div className="text_content text_light">
          <p>Palestilainen Riham Abu Asi asuu väliaikaisesti Jordanian pääkaupungissa Ammanissa viiden lapsensa kanssa, joista kahdelle hän on tullut hakemaan hoitoa. Heidät on majoitettu hotelliin.</p>
          <p>Rital haavoittui Israelin ilmaiskussa, joita tehtiin Gazan kaistalle sodan tuossa vaiheessa lähes taukoamatta. Kaksivuotias Lolla puolestaan sairastaa silmäsyöpää.</p>
          <p>Rital on yksi Gazan sodan lapsiuhreista. Unicefin mukaan sodassa on loukkaantunut lähes 45 000 lasta.</p>
          <p>Sodan seurauksena Gazan terveydenhuoltojärjestelmä on romahtanut täydellisesti. Ennen sodan alkua Gazassa oli 36 sairaalaa, mutta nyt niistä jokainen on osittain vaurioitunut tai täysin tuhoutunut. Viimeiset toiminnassa olevat sairaalat ovat äärirajoillaan.</p>
          <p>Jordania on harvoja maita, joka on ottanut lapsipotilaita hoitoon tuhotusta Gazasta.</p>
        </div>
      </div>
      <Visualisation />
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #111, #eee)', height: '500px' }} />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Iho suli kiinni vaatteisiin</h3>
          <p>– Iskun voimasta päällemme lensi kauheasti romua, palestiinalaisäiti Riham Abu Asi muistelee hetkeä, jolloin hänen tyttärensä haavoittui. Hän kertoo tyttären huutaneen, että jalkaan tuli ”iso pipi”.</p>
          <p>Lapsen jalkojen iho irtosi, kun Riham Abu Asi riisui tyttäreltään housut nähdäkseen, mitä oli tapahtunut. </p>
          <p>Ohjuksen lämpöaalto oli polttanut kudoksen niin syvältä, että iho oli sulanut kiinni kankaaseen.</p>
          <p>Hätääntynyt äiti juoksi tytär sylissään sairaalaan, mutta saarretussa Gazassa Ritalille pystyttiin antamaan ainoastaan alkeellista ensiapua. </p>
          <p>Tyttären kunto oli lopulta niin huono, että hän ei kyennyt kunnolla edes kävelemään. </p>
          <p>Riham Abu Asin mukaan iskussa kuoli 14 ihmistä, jotka makaavat yhä betonimurskan alla. Rital itse ei muista tapahtuneesta mitään; kysyttäessä hän hokee vain hämmentyneenä unohtaneensa kaiken.</p>
        </div>
      </div>
      <Video background="#eee" path="https://placeholdervideo.dev/1600x900" />
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #eee, #ccc)', height: '500px' }} />
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #ccc, #eee)' }}>
        <div className="text_content text_dark">
          <h3>Kuningas Abdullahin lääketieteellinen käytävä</h3>
          <p>Vuonna 2025 Jordania päätti ottaa 2000 lapsipotilasta Gazasta hoitoon. </p>
          <p>Kyse on kuningas Abdullah II:n aloitteesta, joka tunnetaan nimellä Jordanian lääketieteellinen käytävä. </p>
          <p>Kuningas ilmoitti tästä puheessaan Washingtonin-vierailunsa yhteydessä helmikuussa 2025. Toiminta käynnistyi nopeasti: ensimmäiset pienet potilaat saapuivat Jordaniaan jo maaliskuun alussa.</p>
        </div>
      </div>
      <Image path="assets/img/map.png" alt="Kuvateksti" background="#eee" />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <p>Hyvin pieni osa apua tarvitsevista lapsista pääsee hoitoon ulkomaille. </p>
          <p>YK:n mukaan Lähi-idän maat ovat vastaanottaneet yli 90 prosenttia gazalaisista potilaista, joista suurin osa on lapsia. </p>
          <p>Suomi teki päätöksen olla ottamatta lapsipotilaita Gazasta. </p>
        </div>
      </div>
      <Mosaic
        background="#000"
        elements={[
          {
            height: 267,
            initialOffset: { x: 20, y: 0 },
            left: -25, // relative to center
            path: 'assets/img/mosaic1/Rital_1.jpg',
            top: -150, // relative to center
            type: 'image',
            width: 400,
          },
          {
            height: 267,
            initialOffset: { x: -20, y: -20 },
            left: -375, // relative to center
            path: 'assets/img/mosaic1/Riham_ja_Rital.jpg',
            top: -375, // relative to center
            type: 'image',
            width: 400
          },
          {
            height: 267,
            initialOffset: { x: 0, y: -20 },
            left: -200, // relative to center
            path: 'assets/img/mosaic1/Rital_2.jpg',
            top: 140, // relative to center
            type: 'image',
            width: 400,
          },
          {
            height: 200,
            initialOffset: { x: -20, y: -20 },
            left: 50,
            path: 'https://placeholdervideo.dev/300x200',
            top: -375,
            type: 'video',
            width: 300,
          },
          {
            height: 200,
            initialOffset: { x: 0, y: 20 },
            left: -350,
            path: 'https://placeholdervideo.dev/300x200',
            top: -85,
            type: 'video',
            width: 300,
          }
        ]}
      />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Kilpajuoksu byrokratiaa vastaan</h3>
          <p>Maailman terveysjärjestö (WHO) organisoi potilaiden siirtämisen Gazasta muihin maihin. Apua tarvitsevia palestiinalaispotilaita on WHO:n arvioiden mukaan lähes 20 000. </p>
          <p>Gazan terveysministeriön mukaan viimeisen kahden vuoden aikana lähes 1 300 potilasta on kuollut odottaessaan pääsyä kiireelliseen hoitoon ulkomaille.</p>
          <p>WHO on toistuvasti kehottanut Israelia nopeuttamaan lupamenettelyjä vakavasti sairaiden potilaiden – erityisesti lasten – siirtämiseksi hoitoon Gazan ulkopuolelle.</p>
          <p>Evakuointiprosessi voi kestää viikkoja tai kuukausia, ja joissakin tapauksissa lupia ei myönnetä.</p>
          <p>Näin kävi myös 4-vuotiaalle Ritalille. Israel katsoi, että hänen palovammansa eivät olleet riittävän vakavia, jotta ne olisivat oikeuttaneet lääketieteelliseen evakuointiin. </p>
          <p>Vasta nuoremman sisaruksen syöpädiagnoosi avasi tien Jordaniaan. Äiti ja lapset pääsivät lopulta Ammaniin, ja Ritalille tehtiin hyvin nopeasti Jordaniaan saavuttua vaativa ihonsiirtoleikkaus.</p>
        </div>
      </div>
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #eee, #111)', height: '500px' }} />
      <Video background="#eee" path="https://placeholdervideo.dev/1080x1080" />
      <div className="container_text_content" style={{ background: 'linear-gradient(to bottom, #111, #eee)', height: '500px' }} />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Sytostaatit eivät nujertaneet syöpää</h3>
          <p>Kaksivuotiaan Lollan syöpä löytyi, kun äiti Riham Abu Asi huomasi toisen tyttärensä silmässä poikkeavan valkoisen “kaihimaisen” alueen.</p>
          <p>Perheen kohtalo on tyypillinen esimerkki siitä, miten hitaasti lasten lääketieteelliset evakuoinnit Gazasta etenevät.</p>
          <p>Gazalainen lääkäri teki ensin lähetteen, jonka jälkeen Palestiinan terveysministeriön komitea valitsi Lollan evakuoitavien lapsipotilaiden listalle. </p>
          <p>Kun lista on valmis, alkaa kilpajuoksu byrokratiaa vastaan: etsitään vastaanottajamaa, koordinoidaan turvallisuusselvitykset Israelin viranomaisten kanssa ja varmistetaan turvallinen siirto rajan yli. </p>
          <p>Riham Abu Asi sai lopulta matkustusluvan itselleen ja lapsilleen. Mutta matkustuslupa ei koskenut perheen isää, hänen oli jäätävä Gazaan. </p>
        </div>
      </div>
      <Mosaic
        background="#000"
        elements={[
          {
            height: 267,
            initialOffset: { x: -20, y: 0 },
            left: -400, // relative to center
            path: 'assets/img/mosaic2/20251216_BS_YLE_Q1020232_0015.jpg',
            top: -130, // relative to center
            type: 'image',
            width: 400,
          },
          {
            height: 267,
            initialOffset: { x: 20, y: 0 },
            left: 25, // relative to center
            path: 'assets/img/mosaic2/20251212_BS_YLE_Q1010404_0004.jpg',
            top: -130, // relative to center
            type: 'image',
            width: 400
          },
          {
            height: 267,
            initialOffset: { x: 0, y: -20 },
            left: -200, // relative to center
            path: 'assets/img/mosaic2/20251211_BS_YLE_Q1010295_0001.jpg',
            top: -425, // relative to center
            type: 'image',
            width: 400,
          },
          {
            height: 300,
            initialOffset: { x: 0, y: 20 },
            left: -200,
            path: 'https://placeholdervideo.dev/400x300',
            top: 160,
            type: 'video',
            width: 400,
          }
        ]}
      />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Rankka matka Jordaniaan</h3>
          <p>Sairaalahoitoon pääsevien lasten matka Jordaniaan ei ole helppo, sillä heidät evakuoidaan maareittejä pitkin. </p>
          <p>Kaikkein kiireisimmissä tapauksissa käytetään Jordanian armeijan helikoptereita, jotka ovat kyydinneet potilaat rajanylityspaikalta Jordaniaan. </p>
          <p>Jordaniassa potilaat pääsevät maan parhaisiin sairaaloihin. Toistaiseksi maahan on päässyt hoitoon runsaat 600 palestiinalaislasta. Jordania ei voi vaikuttaa evakuoitavien lasten määrään, sillä Israelin viranomaiset myöntävät poistumisluvat.</p>
        </div>
      </div>
      <Image path="assets/img/Riham_Abu_Asi.jpg" alt="Kuvateksti" background="#eee" />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Saapuminen Ammaniin</h3>
          <p>Riham Abu Asi pääsi neljän lapsensa kanssa Ammaniin heinäkuussa 2025. Tilanne oli erityisen raskas, sillä hän odotti tuolloin lasta. </p>
          <p>Riham Abu Asi saapui Ammaniin mukanaan vain yllään olleet vaatteet ja tärkeimmät asiakirjansa. Kaikki muu takavarikointiin Israelin tiesululla.</p>
          <p>– Meiltä vietiin vaatteet ja kaikki tavarat. Saimme pitää vain paperit. Jopa lasten vaipat ja lääkkeet piti luovuttaa pois, Riham Abu Asi kertoo. </p>
          <p>Heidät majoitettiin paikalliseen vaatimattomaan hotelliin, joka on Kuningas Husseinin syöpäsairaalan läheisyydessä. Hotellissa majoittui useita gazalaisperheitä, jotka olivat tulleet Jordaniaan hakemaan lääketieteellistä apua.</p>
          <p>Jordaniassa kaksivuotiaan Lollan hoito aloitettiin välittömästi solunsalpaajilla kasvaimen nujertamiseksi, mutta sytostaatit eivät tehonneet toivotulla tavalla, vaan lääkärit joutuivat poistamaan Lollan oikean silmän.</p>
          <p>Ensimmäisen leikkauksen jälkeen hoitoa jatkettiin sytostaateilla, mutta ne eivät tehonneet toivotulla tavalla jäivät edelleen heikoiksi. Lääkärit suosittelivat myös Lollan  vasemman silmän poistamista, jotta syöpä ei leviäisi aivoihin. </p>
          <p>Lollan Gazassa oleva Isä kieltäytyi toimenpiteestä, sillä hän piti ajatusta tyttärensä sokeutumisesta lohduttomana. </p>
        </div>
      </div>
      <Video background="#eee" path="https://placeholdervideo.dev/1080x1080" />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Paluu pommitettuun kotiin</h3>
          <p>Riham Abu Asin 8-vuotias poika Luai Abu Asi puhuu isänsä kanssa puhelimessa. Poika kertoo palaavansa pian kotiin, kun Lolla-siskon syöpähoidot ovat päättyneet.</p>
          <p>Lasten isä on järkyttynyt toiveesta. Hän kertoo, ettei kotiin voi palata, koska Gazassa kaikki on pommitettu maan tasalle</p>
          <p>Perheellä ei ole paikkaa mihin palata. Heidän kotinsa on tuhoutunut täysin Gazan pommituksissa. Siitä on jäljellä enää kasa betonimurskaa.</p>
          <p>Ennen Jordaniaan tuloa he asuivat lähes kaksi vuotta teltoissa.</p>
        </div>
      </div>
      <Visualisation2 />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h3>Jordania pelkää uutta pakolaisaaltoa</h3>
          <p>Israel on jatkanut iskujaan tulitauosta huolimatta. Lokakuussa 2025 alkaneen hauraan tulitauon jälkeen yli 100 lasta on kuollut. Silti Jordania palauttaa lapset takaisin kotimaahansa hoitojen päätyttyä.</p>
        </div>
      </div>
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <p>Jordania perustelee linjaansa sillä, että se on jo aiemmin antanut kodin miljoonille palestiinalaispakolaisille, joten sen resurssit ovat jo nyt äärirajoilla. Uusi hallitsematon pakolaisaalto voisi horjuttaa maan sisäistä tasapainoa.</p>
          <p>Gaza ympäröivät arabimaat pelkäävät, että jos gazalaiset jäävät pysyvästi rajojen ulkopuolelle, heiltä viedään lopullisesti mahdollisuus palata kotimaahansa. </p>
        </div>
      </div>
      <Video background="#eee" path="https://placeholdervideo.dev/1080x1080" />
      <div className="container_text_content" style={{ background: '#eee' }}>
        <div className="text_content text_dark">
          <h4>Tekijät</h4>
          <p>
            <span className="label">Toimittaja:</span>
            {' '}
            <span className="value">Toimittaja tyyppi</span>
          </p>
          <p>
            <span className="label">Tuottaja:</span>
            {' '}
            <span className="value">Tuottaja tyyppi</span>
          </p>
          <p>
            <span className="label">Tekninen toteutus:</span>
            {' '}
            <span className="value">Tekninen tyyppi</span>
          </p>
          <p>
            <span className="label">Graafinen suunnittelu:</span>
            {' '}
            <span className="value">Graafinen tyyppi</span>
          </p>
          <p>
            <span className="label">Julkaistu:</span>
            {' '}
            <span className="value">2.5.2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

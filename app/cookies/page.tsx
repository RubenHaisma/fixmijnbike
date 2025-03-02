export default function CookiesPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cookiebeleid</h1>
      
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-6">
          Laatst bijgewerkt: 1 mei 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op je apparaat worden geplaatst wanneer je onze website bezoekt. 
            Ze worden veel gebruikt om websites efficiënter te laten werken en om informatie te verstrekken aan de 
            eigenaren van de website. Cookies helpen ons bijvoorbeeld om je voorkeuren te onthouden, te begrijpen 
            hoe je onze website gebruikt en onze diensten te verbeteren.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Welke cookies gebruiken we?</h2>
          <p className="mb-4">
            We gebruiken de volgende soorten cookies:
          </p>
          
          <h3 className="text-lg font-medium mb-2">Noodzakelijke cookies</h3>
          <p className="mb-4">
            Deze cookies zijn essentieel om je in staat te stellen om door de website te navigeren en de functies 
            te gebruiken, zoals toegang tot beveiligde delen van de website. Zonder deze cookies kunnen de diensten 
            die je hebt gevraagd niet worden geleverd.
          </p>
          <table className="min-w-full border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Naam</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Vervaltijd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">session</td>
                <td className="border border-gray-300 px-4 py-2">Bewaart je sessie-informatie</td>
                <td className="border border-gray-300 px-4 py-2">2 weken</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">csrf_token</td>
                <td className="border border-gray-300 px-4 py-2">Beschermt tegen cross-site request forgery</td>
                <td className="border border-gray-300 px-4 py-2">Sessie</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="text-lg font-medium mb-2">Voorkeurscookies</h3>
          <p className="mb-4">
            Deze cookies onthouden je voorkeuren, zodat we je een betere gebruikerservaring kunnen bieden.
          </p>
          <table className="min-w-full border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Naam</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Vervaltijd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">theme</td>
                <td className="border border-gray-300 px-4 py-2">Onthoudt je themavoorkeur (licht/donker)</td>
                <td className="border border-gray-300 px-4 py-2">1 jaar</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">language</td>
                <td className="border border-gray-300 px-4 py-2">Onthoudt je taalvoorkeur</td>
                <td className="border border-gray-300 px-4 py-2">1 jaar</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="text-lg font-medium mb-2">Analytische cookies</h3>
          <p className="mb-4">
            Deze cookies verzamelen informatie over hoe bezoekers onze website gebruiken, bijvoorbeeld welke 
            pagina's ze het meest bezoeken en of ze foutmeldingen krijgen. Deze cookies verzamelen geanonimiseerde 
            informatie en worden gebruikt om onze website te verbeteren.
          </p>
          <table className="min-w-full border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Naam</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Vervaltijd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_ga</td>
                <td className="border border-gray-300 px-4 py-2">Google Analytics - Onderscheidt gebruikers</td>
                <td className="border border-gray-300 px-4 py-2">2 jaar</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_gid</td>
                <td className="border border-gray-300 px-4 py-2">Google Analytics - Onderscheidt gebruikers</td>
                <td className="border border-gray-300 px-4 py-2">24 uur</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_gat</td>
                <td className="border border-gray-300 px-4 py-2">Google Analytics - Beperkt verzoeksnelheid</td>
                <td className="border border-gray-300 px-4 py-2">1 minuut</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="text-lg font-medium mb-2">Marketing cookies</h3>
          <p className="mb-4">
            Deze cookies worden gebruikt om advertenties relevanter te maken voor jou en je interesses. Ze worden 
            ook gebruikt om het aantal keren dat je een advertentie ziet te beperken en om de effectiviteit van 
            advertentiecampagnes te meten.
          </p>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Naam</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Vervaltijd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_fbp</td>
                <td className="border border-gray-300 px-4 py-2">Facebook Pixel - Identificeert browsers voor advertentiedoeleinden</td>
                <td className="border border-gray-300 px-4 py-2">3 maanden</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">ads/ga-audiences</td>
                <td className="border border-gray-300 px-4 py-2">Google Ads - Gebruikt door Google AdWords om bezoekers opnieuw te betrekken</td>
                <td className="border border-gray-300 px-4 py-2">Sessie</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Hoe kun je cookies beheren?</h2>
          <p className="mb-4">
            Je kunt je browser instellen om cookies te weigeren, te verwijderen of je te waarschuwen wanneer 
            cookies worden geplaatst. Je kunt ook cookies verwijderen die al op je apparaat zijn opgeslagen.
          </p>
          <p className="mb-4">
            Houd er rekening mee dat als je cookies uitschakelt of weigert, sommige delen van onze website 
            mogelijk niet goed werken.
          </p>
          <p>
            Je kunt meer informatie vinden over het beheren van cookies in je browser op de volgende links:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Cookies van derden</h2>
          <p>
            Sommige cookies worden geplaatst door diensten van derden die op onze pagina's verschijnen. 
            We hebben geen controle over deze cookies. Deze derden kunnen cookies, web beacons of soortgelijke 
            technologieën gebruiken voor het verzamelen van informatie over je activiteiten op onze website 
            en andere websites. Deze informatie kan door deze derden worden gebruikt om je relevante advertenties 
            te tonen op andere websites die je bezoekt en om de effectiviteit van hun marketingcampagnes te meten.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Wijzigingen aan dit cookiebeleid</h2>
          <p>
            We kunnen dit cookiebeleid van tijd tot tijd bijwerken. Wanneer we substantiële wijzigingen 
            aanbrengen, zullen we je hiervan op de hoogte stellen via e-mail of een melding op onze website. 
            We raden je aan om dit cookiebeleid regelmatig te controleren op updates.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p>
            Als je vragen hebt over dit cookiebeleid, neem dan contact met ons op via:
          </p>
          <p className="mt-2">
            E-mail: privacy@bikefixnl.nl<br />
            Telefoon: +31 6 12345678
          </p>
        </section>
      </div>
    </div>
  );
}
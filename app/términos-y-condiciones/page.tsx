import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Términos y condiciones | MS Express",
  description: "Términos de uso del software de Multi Servicios Express, incluyendo licencia, soporte y responsabilidades.",
};

export default function TermsPage() {
  return <LegalDoc title="Términos y condiciones de uso del software" updated="Última actualización: 25 de septiembre de 2025">
    <p>Estos términos regulan el uso de los sistemas y aplicaciones desarrollados por Multi Servicios Express (MSExpress), en adelante EL LICENCIANTE. Al instalar, acceder o utilizar cualquiera de nuestros productos de software (en adelante EL SOFTWARE), usted (en adelante EL USUARIO) acepta los presentes términos.</p>
    <h2>1. Software incluido</h2>
    <p>Estos términos aplican a todos los sistemas desarrollados por MSExpress, incluyendo pero no limitándose a:</p>
    <ul>
      <li>Dulus (web y app)</li>
      <li>Sistema Financiero</li>
      <li>Sistema de Alquileres</li>
      <li>Cualquier otro software publicado en este sitio</li>
    </ul>
    <h2>2. Licencia de uso</h2>
    <p>EL LICENCIANTE concede al USUARIO una licencia de uso limitada, no exclusiva, no transferible y revocable de EL SOFTWARE. Esta licencia permite utilizar los sistemas únicamente para fines internos del USUARIO. No otorga derechos de propiedad intelectual ni autorización para vender, sublicenciar, arrendar o distribuir el SOFTWARE.</p>
    <h2>3. Contraprestación y vigencia</h2>
    <p>El uso del SOFTWARE está sujeto al pago de una tarifa mensual de licencia, cuyo monto será comunicado al USUARIO por EL LICENCIANTE. El derecho de uso se renueva automáticamente con el pago de cada período mensual.</p>
    <p>En caso de incumplimiento en el pago, y transcurridos 30 días calendario sin que el USUARIO regularice su situación, la licencia quedará suspendida automáticamente, perdiendo el USUARIO el derecho de acceso y uso del SOFTWARE hasta el pago correspondiente. MSExpress se reserva el derecho de cancelar definitivamente la licencia si el incumplimiento persiste.</p>
    <h2>4. Propiedad intelectual</h2>
    <p>Todos los derechos de autor, marcas y propiedad intelectual de los sistemas corresponden a MSExpress. El USUARIO reconoce que el acceso al SOFTWARE no implica transferencia de derechos de propiedad.</p>
    <h2>5. Restricciones</h2>
    <p>El USUARIO no podrá:</p>
    <ul>
      <li>Modificar o realizar ingeniería inversa</li>
      <li>Usar el SOFTWARE con fines ilegales o contrarios a la ley</li>
      <li>Ceder o compartir accesos con terceros no autorizados</li>
    </ul>
    <h2>6. Soporte y actualizaciones</h2>
    <p>MSExpress podrá proveer soporte técnico y actualizaciones de acuerdo con políticas publicadas en este sitio o en los acuerdos específicos de cada sistema.</p>
    <h2>7. Responsabilidad</h2>
    <p>MSExpress no se hace responsable de pérdidas indirectas, lucro cesante ni fallos derivados del uso indebido del SOFTWARE.</p>
    <h2>8. Datos y confidencialidad</h2>
    <p>Los datos personales procesados por los sistemas serán tratados según la <a href="/politica-privacidad">Política de Privacidad</a> de MSExpress.</p>
    <h2>9. Terminación</h2>
    <p>MSExpress podrá suspender o cancelar la licencia si el USUARIO incumple estos términos o si se mantiene en mora con los pagos de licencia.</p>
    <h2>10. Ley aplicable</h2>
    <p>Este contrato se rige por las leyes de la República Dominicana, sometiéndose a los tribunales de Santo Domingo.</p>
    <h2>11. Copia de seguridad</h2>
    <p>Nuestros sistemas se alojan en infraestructura en la nube que cuenta con políticas estándar de respaldo y seguridad. MSExpress podrá ofrecer planes de backup adicionales según las necesidades del cliente.</p>
    <h2>12. Nivel de servicio</h2>
    <p>MSExpress proveerá el acceso al SOFTWARE de manera continua, salvo en casos de mantenimiento programado, actualizaciones o causas de fuerza mayor. El USUARIO reconoce que pueden existir interrupciones temporales y que estas no constituyen incumplimiento de contrato.</p>
    <h2>13. Mantenimiento y actualizaciones</h2>
    <p>MSExpress podrá realizar actualizaciones, mejoras, correcciones y modificaciones al SOFTWARE en cualquier momento, con el objetivo de optimizar su funcionamiento y seguridad. Dichas actualizaciones no requieren consentimiento previo del USUARIO.</p>
    <h2>14. Limitación de responsabilidad</h2>
    <p>La responsabilidad de MSExpress frente al USUARIO por cualquier reclamación relacionada con el uso del SOFTWARE se limita al monto efectivamente pagado por el USUARIO en concepto de licencia durante el mes inmediatamente anterior al evento que dio origen a la reclamación.</p>
    <h2>15. Uso de datos y cumplimiento legal</h2>
    <p>El USUARIO es responsable del contenido y datos que ingrese, procese o almacene en el SOFTWARE, garantizando que cumplen con la legislación vigente y no infringen derechos de terceros.</p>
    <h2>16. Protección de credenciales</h2>
    <p>El USUARIO es responsable de la seguridad y confidencialidad de sus credenciales de acceso (usuarios y contraseñas), así como de todas las actividades realizadas bajo su cuenta.</p>
    <h2>17. Fuerza mayor</h2>
    <p>MSExpress no será responsable por fallos, retrasos o interrupciones en la prestación del servicio causados por eventos fuera de su control razonable, incluyendo pero no limitándose a fallos globales de infraestructura en la nube, desastres naturales, actos gubernamentales, ciberataques masivos o interrupciones en servicios de terceros.</p>
    <h2>18. Modificación de términos</h2>
    <p>MSExpress se reserva el derecho de modificar los presentes términos y condiciones. Las modificaciones serán publicadas en este sitio y entrarán en vigor desde su publicación. El uso continuado del SOFTWARE implica la aceptación de los cambios.</p>
  </LegalDoc>;
}

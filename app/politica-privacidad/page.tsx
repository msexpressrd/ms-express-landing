import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Política de privacidad | MS Express",
  description: "Cómo Multi Servicios Express recopila, usa y protege los datos personales en sus sistemas y aplicaciones.",
};

export default function PrivacyPage() {
  return <LegalDoc title="Política de privacidad" updated="Documento publicado por Multi Servicios Express (MSEXPRESS).">
    <p>En MSEXPRESS entendemos la importancia de su información personal y cómo se utiliza. Agradecemos su confianza al compartir sus datos, los cuales tratamos con el máximo cuidado, conforme a las buenas prácticas y la legislación vigente en la República Dominicana. Esta Política de Privacidad describe cómo nuestras soluciones recopilan y procesan su información personal a través de nuestra plataforma tecnológica, garantizando su uso adecuado y respetando los principios legales sobre la protección de datos personales.</p>
    <p>Al utilizar la plataforma, usted acepta las prácticas descritas en esta Política de Privacidad.</p>
    <h2>1. Aplicaciones cubiertas</h2>
    <ul>
      <li>Sistema Financiero FAB</li>
      <li>Sistema Facturación e Inventario FAB</li>
      <li>Sistema Alquileres FAB</li>
      <li>Sistema Dulus (versión web y aplicación móvil)</li>
    </ul>
    <h2>2. Recopilación de datos personales</h2>
    <p>Nuestras aplicaciones recopilan los siguientes datos personales para garantizar el acceso y el uso adecuado de los sistemas:</p>
    <ul>
      <li>Obligatorios: nombre y correo electrónico</li>
      <li>Opcionales: número de teléfono, dirección, ocupación, tipo de comprobante fiscal y sexo</li>
    </ul>
    <p>Los datos mencionados se recopilan con conocimiento previo y son indispensables para la creación de usuarios. A cada usuario se le asigna un rol específico (administrador, vendedor, cajero, gestor o gerente), necesario para acceder y utilizar los sistemas de manera adecuada.</p>
    <p>Antes de acceder a ciertos datos o funciones del dispositivo (como Bluetooth), solicitaremos tu permiso explícito.</p>
    <h2>3. Uso de datos personales</h2>
    <p>Los datos recopilados se utilizan para los siguientes fines:</p>
    <ul>
      <li>Proporcionar acceso a las funciones principales de la aplicación</li>
      <li>Enviar notificaciones relacionadas con el servicio</li>
      <li>Validar la veracidad de su identidad para la creación de cuentas de usuario</li>
    </ul>
    <h2>4. Almacenamiento y protección</h2>
    <p>Los datos personales se almacenan de forma segura en servidores en la nube de Azure y no se comparten con terceros, excepto en los casos necesarios para prestar el servicio o cumplir con regulaciones legales.</p>
    <p>Los datos personales proporcionados, como nombre, correo electrónico y dirección, se recopilan previamente como parte de la documentación legal requerida durante el proceso de contratación con la empresa. Una vez finalizado el proceso de contratación, se notifica al usuario el nombre de usuario asignado para acceder al sistema. Su información personal para la creación de usuario será utilizada para validar la veracidad de su identidad.</p>
    <p>La información personal de los clientes se utiliza exclusivamente para la emisión de facturas y recibos.</p>
    <p>Desarrollamos nuestra plataforma priorizando su seguridad y privacidad en cada etapa, desde la transmisión hasta el mantenimiento. Implementamos medidas de seguridad físicas, electrónicas y procedimentales para garantizar la protección, recopilación, almacenamiento y manejo adecuado de su información personal.</p>
    <p>Es fundamental que tome medidas para proteger su contraseña y prevenir el acceso no autorizado a sus dispositivos, equipos y aplicaciones. Le recomendamos utilizar una contraseña única para su usuario y asegurarse de cerrar sesión al finalizar su uso en equipos compartidos.</p>
    <h2>5. Protección y seguridad de la información</h2>
    <p>MSEXPRESS dispone de mecanismos y medidas para la protección efectiva de la información contra los distintos tipos de riesgo, incluyendo la posible alteración, pérdida, acceso y tratamiento no autorizado de los datos de usuarios y clientes, los cuales son aplicados durante los procesos de recopilación, tratamiento y transmisión de los datos. Salvo circunstancias de fuerza mayor, la información se encuentra adecuadamente resguardada.</p>
    <p>Si tienes preguntas sobre esta política, escríbenos a <a href="mailto:servicios@msexpressrd.com">servicios@msexpressrd.com</a>.</p>
  </LegalDoc>;
}

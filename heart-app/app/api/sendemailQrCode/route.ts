import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import QRCode from 'qrcode';
import path from 'path';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email, username } = await request.json();

    // Validação dos dados
    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email e username são obrigatórios' },
        { status: 400 }
      );
    }

    // 1. Caminho para a imagem do coração
    const heartLogoPath = path.join(process.cwd(), 'public', 'heart.png');
    
    // 2. Gerar QR Code como buffer
    const qrCodeDataUrl = await QRCode.toDataURL(
      `https://ourlovee.vercel.app/yourDatting/${username}`,
      {
        width: 220,
        margin: 2,
        color: {
          dark: '#EC4899', // Cor rosa
          light: '#FFFFFF'
        }
      }
    );

    // 3. Carregar imagens e combinar (dynamic import para evitar erro no build)
    const { createCanvas, loadImage } = await import('canvas');
    const canvas = createCanvas(220, 220);
    const ctx = canvas.getContext('2d');
    
    // Carregar QR Code
    const qrCodeImg = await loadImage(qrCodeDataUrl);
    ctx.drawImage(qrCodeImg, 0, 0, 220, 220);
    
    // Carregar e adicionar logo no centro
    try {
      const logoImg = await loadImage(heartLogoPath);
      const logoSize = 50; // Tamanho do coração
      const centerPosition = (220 - logoSize) / 2;
      
      // Adicionar fundo branco para o logo
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(
        centerPosition - 2, 
        centerPosition - 2, 
        logoSize + 4, 
        logoSize + 4
      );
      
      // Adicionar o coração
      ctx.drawImage(
        logoImg, 
        centerPosition, 
        centerPosition, 
        logoSize, 
        logoSize
      );
    } catch (logoError) {
      console.warn('Não foi possível carregar o logo:', logoError);
      // Continua sem o logo se houver erro
    }

    // 4. Converter para buffer
    const finalQrCodeBuffer = canvas.toBuffer('image/png');

    // 5. Enviar e-mail
    await transporter.sendMail({
      from: `"OurLovee" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '💌 Seu comprovante de compra na ourlovee está aqui!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #ec4899;">Olá ${username}! 💖</h1>
          
          <p>Muito obrigado por confiar na ourlovee para eternizar momentos especiais!</p>
          <p>Recebemos sua compra com sucesso e já estamos cuidando de cada detalhe com muito carinho.</p>

          <p>Abaixo está seu QR Code exclusivo, que dá acesso à sua mini página personalizada:</p>

          
          <div style="margin: 20px auto; padding: 15px; background: #f9f9f9; border-radius: 5px; text-align: center;">
            <img src="cid:qrcode@ourlovee" alt="QR Code" 
                 style="width: 220px; height: 220px; display: block; margin: 0 auto;"/>
            
            <p style="margin-top: 10px; font-size: 12px; color: #666;">
              Ou acesse diretamente:<br/>
              https://ourlovee.vercel.app/yourDatting/${username}
            </p>
          </div>
          
          <p>Se tiver qualquer dúvida ou precisar de ajuda, é só responder este e-mail.</p>
          
          <p>Com carinho,<br/>Equipe ourlovee</p>
        </div>
      `,
      attachments: [{
        filename: `qrcode_${username}.png`,
        content: finalQrCodeBuffer,
        cid: 'qrcode@ourlovee'
      }]
    });

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao enviar email. Por favor, tente novamente mais tarde.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
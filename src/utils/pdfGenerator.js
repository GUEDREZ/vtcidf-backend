// ============================================================
//   PDF Generator – Premium VTC IDF
// ============================================================

import PDFDocument from "pdfkit";

export const generatePDFBuffer = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // ---- HEADER ----
      doc
        .fontSize(20)
        .fillColor("#d4af37")
        .text("Premium VTC Île-de-France", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).fillColor("#000").text("Facture de réservation");
      doc.moveDown(2);

      // ---- INFOS CLIENT / COURSE ----
      doc.fontSize(12).fillColor("#000");

      doc.text(`Nom : ${data.clientName}`);
      doc.text(`Téléphone : ${data.clientPhone}`);
      doc.text(`Email : ${data.clientEmail}`);
      doc.moveDown();

      doc.text(`Départ : ${data.startAddress}`);
      doc.text(`Arrivée : ${data.endAddress}`);
      doc.text(`Distance : ${data.distanceKm} km`);
      doc.text(`Durée : ${data.durationText}`);
      doc.moveDown();

      doc.text(`Date & heure : ${data.dateTime}`);
      doc.text(`Passagers : ${data.passengers}`);
      doc.moveDown();

      doc.fontSize(16).fillColor("#d4af37");
      doc.text(`Prix total : ${data.price} €`, { align: "right" });

      // ---- FOOTER ----
      doc.moveDown(3);
      doc.fontSize(10).fillColor("#999");
      doc.text("Merci pour votre confiance.", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const regNumerico = /^[0-9]+$/;

export const calcolaBMI = (req, res) => {
    const body = req.body;

    const errors = {};
    const p = body.peso.replace(',', '.');
    const a = body.altezza.replace(',', '.');
    
    if (!regNumerico.test(p) || isNaN(parseFloat(p))) {
        errors.peso = "Errore server";
    }
    if (!regNumerico.test(a) || isNaN(parseFloat(a))) {
        errors.altezza = "Errore server";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    const bmi = (p / Math.pow(a / 100, 2)).toFixed(1);
    res.status(200).json(bmi);
};

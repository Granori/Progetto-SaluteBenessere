const API_KEY = "0a8c7f66e7f3453c8c66ded897284ea1";
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

export const contaValori = async (req, res) => {
    const body = req.body;
    const name = body.name;
    const weight = body.weight;
    
    try {
        const responseAPI = await fetch(
            `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${API_KEY}&title=${encodeURIComponent(name)}`
        );

        if (!responseAPI.ok) throw new Error("Errore risposta");

        const data = await responseAPI.json();

        // Controllo se l'API ha effettivamente trovato qualcosa
        // Spoonacular a volte risponde con successo ma valori a 0 o messaggi di errore
        if (data && data.calories && data.calories.value > 0) {
            const ratio = weight ? parseFloat(weight) / 100 : 1;

            const nome = weight ? `${name} (${weight}g)` : name;
            const calorie = Math.round((data.calories?.value || 0)*ratio);
            const proteine = `${Math.round((data.protein?.value || 0)*ratio)}g`;
            const carboidrati = `${Math.round((data.carbs?.value || 0)*ratio)}g`;
            const grassi = `${Math.round((data.fat?.value || 0)*ratio)}g`;
            const status = weight ? `Dati calcolati per ${weight}g` : "Dati per porzione standard";
            
            const objRes = {
                nome,
                calorie,
                proteine,
                carboidrati,
                grassi,
                status
            };

            res.status(201).json({ message: "Dati calcolati con successo", values: objRes });

        } else {
            throw new Error("Errore valori");
        }

    } catch (err) {
        console.log("ERRORE: ", err);

        switch (err) {
            case "Errore risposta":
                res.status(502).json({ message: "Errore di rete o API" })
                break;
        
            case "Errore valori":
                res.status(404).json({ message: "Spiacenti, non abbiamo trovato dati nutrizionali per questo piatto. Prova a essere più specifico." })
            
            default:
                res.status(400).json({ message: "Errore" });
                break;
        }

    }
}
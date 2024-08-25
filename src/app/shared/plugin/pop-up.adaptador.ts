import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export class PopUpAdaptador {

    static generatePopUp(title: string, text: string, icon: SweetAlertIcon) {
        Swal.fire({ title, text, icon });
    }

    static generateQuestionPopUp(title: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        });
    }
}
import { pl } from "date-fns/locale"; 
import { format } from "date-fns";

export default function formatDate(date: Date) {
    return format(date, "do MMMM yyyy", {
        locale: pl
    });
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useSelector } from "react-redux";

export default function EmiDialog({ open, setOpen, price }) {
    const annualInterestRate = 12; // 12% per year
    const monthlyInterestRate = annualInterestRate / 12 / 100; // 0.01 (1% per month)
    const {currency, conversionRate, currencySymbols} = useSelector(state=> state.currency);
    const monthsOptions = [3, 6, 9, 12, 18, 24];

    const calculateEMI = (principal, months) => {
        if (months <= 6) {
            // No Cost EMI: Simple Division
            return Math.round(principal / months);
        } else {
            // Standard EMI: Using EMI Formula
            const r = monthlyInterestRate;
            const n = months;
            return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        }
    };

    const emiPlans = monthsOptions.map((months) => ({
        type: months <= 6 ? "No Cost EMI" : "Standard EMI",
        months,
        amount: `${currencySymbols[currency]}${(calculateEMI(price, months) * conversionRate[currency]).toFixed(2)}`,
    }));

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
                setTimeout(() => setPreventNavigation(false), 100); // Allow time for state reset
            }
        }}>
            <DialogContent className="max-w-lg p-6" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">EMI Plan with EMT</DialogTitle>
                </DialogHeader>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>EMI Type</TableHead>
                                <TableHead>Months</TableHead>
                                <TableHead>Monthly EMI</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {emiPlans.map((plan, index) => (
                                <TableRow key={index}>
                                    <TableCell>{plan.type}</TableCell>
                                    <TableCell>{plan.months}</TableCell>
                                    <TableCell>{plan.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="text-sm text-gray-600 mt-3">
                    <ul className="list-disc list-inside">
                        <li>EMI is inclusive of the processing fee and applicable GST.</li>
                        <li>Loan Protector Insurance: 1% of the package amount is mandatory and included in the EMI.</li>
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
}

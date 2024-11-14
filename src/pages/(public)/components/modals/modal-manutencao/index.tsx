import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";

const ModalManutencao = () => {
    return (
        <Dialog open={true}>
            <DialogTrigger asChild>
                {/* Hidden trigger for dialog, can be activated by other components */}
            </DialogTrigger>
            <DialogContent className="bg-white w-4/5 md:w-1/2 lg:w-1/3 p-10 rounded-2xl shadow-lg border-2 border-red-500 transform transition-all duration-300">
                <DialogHeader>
                    <DialogTitle className="text-center text-red-600 text-4xl font-semibold mb-6">
                        <span className="bg-red-100 p-6 rounded-xl shadow-md text-xl">ANGOHOST EM MANUTENÇÃO</span>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className=" text-2xl font-light text-gray-800 mb-8 space-y-4">
                    <p className="mb-4 text-base  font-medium ">Caro cliente, no momento estamos em manutenção. Agradecemos a sua paciência.</p>
                    <p className="text-base  font-medium">Se deseja adquirir novos serviços, precisar de suporte, ou tiver alguma dúvida, entre em contato conosco de uma das seguintes formas:</p>
                    <div className="space-y-3 mt-6">
                        <p className="text-base font-semibold text-blue-600">
                            <a href="mailto:support@angohost.ao" className="hover:text-blue-800 transition-colors">Envie um email para support@angohost.ao</a>
                        </p>
                        <p className="text-base font-semibold text-blue-600 ">WhatsApp: <span className="text-base font-semibold">+244 942 090 108</span>
                        </p>
                        <p className=" text-base font-semibold">
                            <span className="font-bold">você pode utilizar nosso chat</span>  diretamente no site para adquirir serviços.
                        </p>
                    </div>
                </DialogDescription>
                <div className="text-center mt-8">
                    <button
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
                        onClick={() => window.location.href = 'mailto:support@angohost.ao'}
                    >
                        Entrar em Contato
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalManutencao;

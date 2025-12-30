function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/50 mt-auto">
            <div className="container mx-auto px-4 py-6 max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                <span className="flex gap-2 items-center">
                    <p className="text-3xl pt-2">&copy;</p>
                    <p> {new Date().getFullYear()}</p>
                    <p>Task Board.</p>
                    <p>All Rights Reserved.</p>
                </span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-blue-400 transition-colors">Linkedin</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

export default function ThemePicker({ selectedTheme, onThemeChange, showImageInput, onImageInputChange }) {
    const themes = [
        { id: 'purple-blue', gradient: 'from-purple-600 to-blue-600' },
        { id: 'rose-orange', gradient: 'from-rose-500 to-orange-500' },
        { id: 'emerald-teal', gradient: 'from-emerald-500 to-teal-500' },
        { id: 'custom-img', gradient: 'bg-slate-800', label: '🖼️' }
    ];

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Background Theme</label>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {themes.map(theme => (
                    <button
                        key={theme.id}
                        type="button"
                        onClick={() => onThemeChange(theme.id)}
                        className={`h-12 rounded-lg bg-gradient-to-br ${theme.gradient} border-2 transition-all ${selectedTheme === theme.id
                                ? 'border-white ring-2 ring-purple-500'
                                : 'border-transparent'
                            } flex items-center justify-center text-2xl`}
                    >
                        {theme.label || ''}
                    </button>
                ))}
            </div>
            {showImageInput && (
                <input
                    type="url"
                    placeholder="Or paste background image URL..."
                    onChange={onImageInputChange}
                    className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
            )}
        </div>
    );
}

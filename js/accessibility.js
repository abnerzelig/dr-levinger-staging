/**
 * Accessibility Widget for Dr. Levinger Website
 * תוסף נגישות לאתר ד"ר לוינגר
 */

(function() {
    'use strict';

    // Create accessibility widget
    const widget = {
        settings: {
            fontSize: 100,
            contrast: false,
            links: false,
            readable: false
        },

        init: function() {
            this.loadSettings();
            this.createWidget();
            this.applySettings();
        },

        loadSettings: function() {
            const saved = localStorage.getItem('a11y_settings');
            if (saved) {
                this.settings = JSON.parse(saved);
            }
        },

        saveSettings: function() {
            localStorage.setItem('a11y_settings', JSON.stringify(this.settings));
        },

        createWidget: function() {
            // Create floating button
            const btn = document.createElement('button');
            btn.id = 'a11y-btn';
            btn.setAttribute('aria-label', 'תפריט נגישות');
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style="margin-bottom: 2px;">
                    <circle cx="12" cy="4" r="2"/>
                    <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"/>
                </svg>
                <span style="font-size: 11px; font-weight: 600;">נגישות</span>
            `;
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 99999;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #1e3a5f;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s, background 0.2s;
                font-family: Assistant, sans-serif;
            `;

            // Create panel
            const panel = document.createElement('div');
            panel.id = 'a11y-panel';
            panel.innerHTML = `
                <div style="padding: 20px; direction: rtl; text-align: right;">
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1e3a5f;">הגדרות נגישות</h3>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">גודל טקסט</label>
                        <div style="display: flex; gap: 8px;">
                            <button class="a11y-font" data-size="-10" style="flex:1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: white;">א-</button>
                            <button class="a11y-font" data-size="0" style="flex:1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: white;">איפוס</button>
                            <button class="a11y-font" data-size="10" style="flex:1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: white;">א+</button>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                            <input type="checkbox" id="a11y-contrast" style="margin-left: 10px; width: 18px; height: 18px;">
                            <span>ניגודיות גבוהה</span>
                        </label>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                            <input type="checkbox" id="a11y-links" style="margin-left: 10px; width: 18px; height: 18px;">
                            <span>הדגשת קישורים</span>
                        </label>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                            <input type="checkbox" id="a11y-readable" style="margin-left: 10px; width: 18px; height: 18px;">
                            <span>גופן קריא</span>
                        </label>
                    </div>
                    
                    <button id="a11y-reset" style="width: 100%; padding: 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        איפוס הגדרות
                    </button>
                    
                    <p style="margin-top: 15px; font-size: 12px; color: #666; text-align: center;">
                        <a href="accessibility.html" style="color: #1e3a5f;">הצהרת נגישות</a>
                    </p>
                </div>
            `;
            panel.style.cssText = `
                position: fixed;
                bottom: 85px;
                right: 20px;
                z-index: 99998;
                width: 280px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                display: none;
                font-family: Assistant, sans-serif;
            `;

            document.body.appendChild(btn);
            document.body.appendChild(panel);

            // Event listeners
            btn.addEventListener('click', () => {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });

            // Font size buttons
            panel.querySelectorAll('.a11y-font').forEach(b => {
                b.addEventListener('click', () => {
                    const change = parseInt(b.dataset.size);
                    if (change === 0) {
                        this.settings.fontSize = 100;
                    } else {
                        this.settings.fontSize = Math.min(150, Math.max(80, this.settings.fontSize + change));
                    }
                    this.applySettings();
                    this.saveSettings();
                });
            });

            // Checkboxes
            document.getElementById('a11y-contrast').addEventListener('change', (e) => {
                this.settings.contrast = e.target.checked;
                this.applySettings();
                this.saveSettings();
            });

            document.getElementById('a11y-links').addEventListener('change', (e) => {
                this.settings.links = e.target.checked;
                this.applySettings();
                this.saveSettings();
            });

            document.getElementById('a11y-readable').addEventListener('change', (e) => {
                this.settings.readable = e.target.checked;
                this.applySettings();
                this.saveSettings();
            });

            // Reset button
            document.getElementById('a11y-reset').addEventListener('click', () => {
                this.settings = { fontSize: 100, contrast: false, links: false, readable: false };
                this.applySettings();
                this.saveSettings();
                document.getElementById('a11y-contrast').checked = false;
                document.getElementById('a11y-links').checked = false;
                document.getElementById('a11y-readable').checked = false;
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                    panel.style.display = 'none';
                }
            });
        },

        applySettings: function() {
            const html = document.documentElement;
            
            // Font size
            html.style.fontSize = this.settings.fontSize + '%';
            
            // High contrast
            if (this.settings.contrast) {
                html.classList.add('a11y-high-contrast');
            } else {
                html.classList.remove('a11y-high-contrast');
            }
            
            // Highlight links
            if (this.settings.links) {
                html.classList.add('a11y-highlight-links');
            } else {
                html.classList.remove('a11y-highlight-links');
            }
            
            // Readable font
            if (this.settings.readable) {
                html.classList.add('a11y-readable-font');
            } else {
                html.classList.remove('a11y-readable-font');
            }

            // Update checkboxes if they exist
            const contrastCb = document.getElementById('a11y-contrast');
            const linksCb = document.getElementById('a11y-links');
            const readableCb = document.getElementById('a11y-readable');
            
            if (contrastCb) contrastCb.checked = this.settings.contrast;
            if (linksCb) linksCb.checked = this.settings.links;
            if (readableCb) readableCb.checked = this.settings.readable;
        }
    };

    // Add CSS for accessibility modes
    const style = document.createElement('style');
    style.textContent = `
        .a11y-high-contrast {
            filter: contrast(1.3) !important;
        }
        .a11y-high-contrast * {
            border-color: #000 !important;
        }
        .a11y-highlight-links a {
            background-color: yellow !important;
            color: #000 !important;
            text-decoration: underline !important;
            padding: 2px 4px !important;
        }
        .a11y-readable-font,
        .a11y-readable-font * {
            font-family: Arial, sans-serif !important;
            letter-spacing: 0.05em !important;
            word-spacing: 0.1em !important;
            line-height: 1.8 !important;
        }
        #a11y-btn:focus {
            outline: 3px solid #ffd700 !important;
            outline-offset: 2px !important;
        }
        @media (max-width: 768px) {
            #a11y-panel {
                left: 10px !important;
                right: 10px !important;
                width: auto !important;
            }
            #a11y-btn {
                bottom: 15px !important;
                right: 15px !important;
                width: 55px !important;
                height: 55px !important;
            }
            #a11y-btn span {
                font-size: 10px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => widget.init());
    } else {
        widget.init();
    }
})();

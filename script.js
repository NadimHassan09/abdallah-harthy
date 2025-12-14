// Store original main content
let mainContent = null;
let originalContent = null;

// Policy titles mapping
const policyTitles = {
    'privacy': 'سياسة الخصوصية',
    'terms': 'شروط الاستخدام',
    'warranty': 'الضمان والتعويضات',
    'return': 'سياسة الاسترجاع'
};

// Policy content mapping (placeholder content - you can customize these)
const policyContent = {
    'privacy': 'نحن في مكتب أبو عبدالله الحارثي للخدمات والمركبات نلتزم بحماية خصوصية عملائنا. نحن نجمع ونستخدم المعلومات الشخصية فقط للأغراض المطلوبة لتقديم خدماتنا وتحسين تجربة العملاء. لا نقوم ببيع أو مشاركة بيانات عملائنا مع أطراف ثالثة دون موافقتهم الصريحة. نستخدم أحدث التقنيات لضمان أمان بياناتك وحمايتها من الوصول غير المصرح به.',
    'terms': 'باستخدام خدمات مكتب أبو عبدالله الحارثي للخدمات والمركبات، فإنك توافق على الالتزام بالشروط والأحكام المذكورة. نحن نقدم خدماتنا وفق الأنظمة والقوانين المعتمدة في المملكة العربية السعودية. العميل مسؤول عن توفير المعلومات الصحيحة والدقيقة. نحتفظ بالحق في رفض أو إلغاء أي معاملة في حالة عدم الالتزام بالشروط أو وجود مخالفات.',
    'warranty': 'نضمن في مكتب أبو عبدالله الحارثي للخدمات والمركبات الدقة في تنفيذ جميع المعاملات وفق الأنظمة المعتمدة. في حالة حدوث أي خطأ ناتج عن إهمال من جانبنا، نلتزم بالتعويض المناسب للعميل. جميع خدماتنا تتم وفق أفضل الممارسات والضمانات القانونية. نحن لسنا مسؤولين عن الأخطاء الناتجة عن معلومات غير صحيحة مقدمة من العميل.',
    'return': 'في مكتب أبو عبدالله الحارثي للخدمات والمركبات، نعمل على ضمان رضا عملائنا في جميع المعاملات. في حالة عدم الرضا عن الخدمة المقدمة، يمكن للعميل التواصل معنا لمناقشة الخيارات المتاحة. بعض المعاملات الحكومية لا يمكن التراجع عنها بعد الإتمام، ولكننا نقدم الدعم والمساعدة في جميع الحالات لضمان أفضل تجربة ممكنة.'
};

// Function to create policy page template
function createPolicyPage(policyType) {
    const title = policyTitles[policyType] || 'سياسة';
    const content = policyContent[policyType] || '';

    return `
        <!-- Policy Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <h1>${title}</h1>
            </div>
            <div class="hero-image"><img src="1.png" alt=""></div>
        </section>

        <!-- Policy Content Section -->
        <section class="policy-content">
            <div class="policy-content-wrapper">
                <p>${content}</p>
            </div>
        </section>
    `;
}

// Function to save original content
function saveOriginalContent() {
    if (!originalContent && mainContent) {
        originalContent = mainContent.innerHTML;
    }
}

// Function to load policy page
function loadPolicyPage(policyType) {
    saveOriginalContent();
    if (mainContent) {
        mainContent.innerHTML = createPolicyPage(policyType);
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Function to restore original content
function restoreOriginalContent() {
    if (originalContent && mainContent) {
        mainContent.innerHTML = originalContent;
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Check if currently on a policy page
function isPolicyPage() {
    return mainContent && mainContent.querySelector('.policy-content') !== null;
}

// Smooth scrolling for navigation links using event delegation
function handleNavigationClick(e) {
    // Skip policy links - they have their own handler
    const policyLink = e.target.closest('a.policy-link');
    if (policyLink) return;
    
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    e.preventDefault();
    // Restore original content if we're on a policy page
    if (isPolicyPage()) {
        restoreOriginalContent();
        // Wait for content to restore before scrolling
        setTimeout(() => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    } else {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Get main content element
    mainContent = document.getElementById('main-content');
    
    // Add event listeners to policy links using event delegation
    // This ensures it works even after content is replaced
    document.addEventListener('click', function(e) {
        const policyLink = e.target.closest('a.policy-link');
        if (policyLink) {
            e.preventDefault();
            e.stopPropagation();
            const policyType = policyLink.getAttribute('data-policy');
            if (policyType) {
                loadPolicyPage(policyType);
            }
        }
    });

    // Make logo clickable to restore home page
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            restoreOriginalContent();
        });
    }

    // Setup navigation links using event delegation (works for dynamically added content)
    document.addEventListener('click', handleNavigationClick);

        // Sticky header effect
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
});

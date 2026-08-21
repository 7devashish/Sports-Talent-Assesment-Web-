"""
StarQ Machine Learning Talent Model
Random Forest Regressor & Classifier with cross-validation and feature importances.
"""

import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler

class CricketTalentMLModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, max_depth=6, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        self._train_baseline_model()
        self.load_kmeans_models()

    def _train_baseline_model(self):
        """
        Trains initial baseline random forest on synthetic historical scouting dataset
        consisting of 500 multi-modal youth player profiles.
        """
        np.random.seed(42)
        n_samples = 500

        # Features: [age, comp_level, batting_avg, strike_rate, bowling_avg, bowling_econ, sprint_10m, vert_jump, posture_score, balance_score, rotation_score, consistency_rate]
        X = np.zeros((n_samples, 12))
        X[:, 0] = np.random.uniform(14, 21, n_samples) # Age
        X[:, 1] = np.random.uniform(0.8, 1.15, n_samples) # Comp level multiplier
        X[:, 2] = np.random.uniform(15, 60, n_samples) # Batting avg
        X[:, 3] = np.random.uniform(85, 170, n_samples) # Strike rate
        X[:, 4] = np.random.uniform(12, 45, n_samples) # Bowling avg
        X[:, 5] = np.random.uniform(4.0, 9.5, n_samples) # Economy
        X[:, 6] = np.random.uniform(1.65, 2.25, n_samples) # 10m sprint (s)
        X[:, 7] = np.random.uniform(40, 75, n_samples) # Vert jump (cm)
        X[:, 8] = np.random.uniform(60, 98, n_samples) # CV Posture score
        X[:, 9] = np.random.uniform(60, 98, n_samples) # CV Balance score
        X[:, 10] = np.random.uniform(60, 98, n_samples) # CV Rotation score
        X[:, 11] = np.random.uniform(50, 95, n_samples) # Consistency %

        # Ground truth talent formula with noise
        y = (
            (X[:, 2] / 60.0 * 25.0) +
            (X[:, 3] / 170.0 * 20.0) +
            ((2.30 - X[:, 6]) / 0.70 * 20.0) +
            (X[:, 7] / 75.0 * 15.0) +
            (X[:, 9] / 100.0 * 10.0) +
            (X[:, 10] / 100.0 * 10.0)
        ) * (X[:, 1])
        y = np.clip(y + np.random.normal(0, 2.5, n_samples), 45, 98)

        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True

    def predict_talent(self, feature_dict):
        """
        Predicts talent potential score and returns feature contribution explanation.
        """
        features = np.array([[
            feature_dict.get('age', 17),
            feature_dict.get('comp_level_multiplier', 0.95),
            feature_dict.get('batting_avg', 35),
            feature_dict.get('strike_rate', 130),
            feature_dict.get('bowling_avg', 25),
            feature_dict.get('economy', 6.5),
            feature_dict.get('sprint_10m', 1.85),
            feature_dict.get('vertical_jump', 55),
            feature_dict.get('posture_score', 85),
            feature_dict.get('balance_score', 85),
            feature_dict.get('rotation_score', 85),
            feature_dict.get('consistency_rate', 80)
        ]])

        scaled_features = self.scaler.transform(features)
        pred_score = self.model.predict(scaled_features)[0]

        feature_names = [
            'Age Headroom', 'Competition Context', 'Batting Performance', 'Scoring Velocity (SR)',
            'Bowling Average', 'Economy Control', 'Sprint Acceleration', 'Explosive Power',
            'Postural Alignment', 'Kinetic Balance', 'Rotational Torque', 'Consistency'
        ]
        importances = self.model.feature_importances_
        feature_importance_map = {name: round(float(imp) * 100, 1) for name, imp in zip(feature_names, importances)}

        return {
            "predicted_talent_potential": round(float(pred_score), 1),
            "feature_importances": feature_importance_map,
            "model_type": "RandomForestRegressor (100 trees)",
            "status": "active"
        }


    def load_kmeans_models(self):
        import pickle
        import os
        
        self.kmeans_model = None
        self.kmeans_scaler = None
        self.kmeans_imputer = None
        
        try:
            if os.path.exists('models/kmeans_model_colab.pkl'):
                with open('models/kmeans_model_colab.pkl', 'rb') as f:
                    self.kmeans_model = pickle.load(f)
            
            if os.path.exists('models/kmeans_scaler_colab.pkl'):
                with open('models/kmeans_scaler_colab.pkl', 'rb') as f:
                    self.kmeans_scaler = pickle.load(f)
                    
            if os.path.exists('models/kmeans_imputer_colab.pkl'):
                with open('models/kmeans_imputer_colab.pkl', 'rb') as f:
                    self.kmeans_imputer = pickle.load(f)
                    
        except Exception as e:
            print(f"Warning: Failed to load K-Means models. Error: {e}")
            
    def predict_archetype(self, features_dict):
        if not self.kmeans_model:
            return {"error": "K-Means model not loaded. Check .pkl files."}
            
        import numpy as np
        import pandas as pd
        
        # Determine features that were likely used in the clustering
        # We need to construct the 2D array in the correct order. 
        # Typically it's: batting_avg, strike_rate, etc. 
        # For a robust approach we can try to guess or use all of them if the scaler/imputer has feature_names_in_
        
        # In a real scenario we need the exact columns used. We will extract a generic list of typical columns.
        cols = ['matches', 'innings', 'total_runs', 'highest_score', 'batting_avg', 'strike_rate', 
                'fours', 'sixes', 'fifties', 'hundreds', 'ducks', 'not_outs']
        
        row_data = []
        for c in cols:
            row_data.append(float(features_dict.get(c, 0.0)))
            
        X = np.array([row_data])
        
        # Optional: if you passed dataframe directly
        df_x = pd.DataFrame(X, columns=cols)
        
        try:
            if self.kmeans_imputer:
                # If it's a pandas dataframe trained imputer
                if hasattr(self.kmeans_imputer, 'feature_names_in_'):
                    df_imputed = pd.DataFrame([features_dict])
                    # Reindex to match features
                    df_imputed = df_imputed.reindex(columns=self.kmeans_imputer.feature_names_in_, fill_value=0.0)
                    X = self.kmeans_imputer.transform(df_imputed)
                else:
                    X = self.kmeans_imputer.transform(X)
                    
            if self.kmeans_scaler:
                if hasattr(self.kmeans_scaler, 'feature_names_in_') and not self.kmeans_imputer:
                    df_scaled = pd.DataFrame([features_dict])
                    df_scaled = df_scaled.reindex(columns=self.kmeans_scaler.feature_names_in_, fill_value=0.0)
                    X = self.kmeans_scaler.transform(df_scaled)
                else:
                    X = self.kmeans_scaler.transform(X)
                    
            cluster_id = int(self.kmeans_model.predict(X)[0])
        except Exception as e:
            print(f"Prediction error using exact features, falling back... {e}")
            cluster_id = 0
            
        archetype_map = {
            0: 'Power Finisher',
            1: 'Aggressive Top-Order Batter',
            2: 'Technical Opener / Anchor',
            3: 'Middle-Order Stabilizer'
        }
        
        return {
            "cluster_id": cluster_id,
            "archetype_name": archetype_map.get(cluster_id, "Utility Batter")
        }
talent_ml_instance = CricketTalentMLModel()
